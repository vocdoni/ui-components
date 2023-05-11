import { ChakraProps } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { CensusType, CspVote, ElectionStatus, PublishedElection, Vote } from '@vocdoni/sdk'
import { ComponentType, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useClient } from '../../client'
import { HR } from '../layout'
import { ElectionActions } from './Actions'
import { ElectionDescription } from './Description'
import { ElectionHeader } from './Header'
import { ElectionQuestions } from './Questions'
import { ElectionResults } from './Results'
import { ElectionSchedule } from './Schedule'
import { ElectionStatusBadge } from './StatusBadge'
import { ElectionTitle } from './Title'
import { VoteButton } from './VoteButton'

export type ElectionProviderProps = {
  id?: string
  election?: PublishedElection
  signer?: Wallet | Signer
  ConnectButton?: ComponentType
  fetchCensus?: boolean
  beforeSubmit?: (vote: Vote) => boolean
}

export const useElectionProvider = ({
  id,
  election: data,
  signer: s,
  fetchCensus,
  beforeSubmit,
  ...rest
}: ElectionProviderProps) => {
  const { client, signer, setSigner, trans } = useClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [voting, setVoting] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [voted, setVoted] = useState<string | null>(null)
  const [error, setError] = useState<string>('')
  const [election, setElection] = useState<PublishedElection | undefined>(data)
  const [isAbleToVote, setIsAbleToVote] = useState<boolean | undefined>(undefined)
  const [votesLeft, setVotesLeft] = useState<number>(0)
  const [isInCensus, setIsInCensus] = useState<boolean>(false)
  const [censusType, setCensusType] = useState<CensusType | undefined>(undefined)
  const [voteInstance, setVoteInstance] = useState<Vote | undefined>(undefined)
  const [cspVotingToken, setCspVotingToken] = useState<string | undefined>(undefined)
  const [authToken, setAuthToken] = useState<any>(null)
  const [handler, setHandler] = useState<string>("facebook") // Hardcoded until we let to choose

  // set signer in case it has been specified in the election
  // provider (rather than the client provider). Not sure if this is useful tho...
  useEffect(() => {
    if (!client || signer || !s) return

    setSigner(s)
  }, [signer, client, s])

  useEffect(() => {
    if(cspVotingToken && voteInstance) {
      cspVote(cspVotingToken, voteInstance)
    }
  },[cspVotingToken, voteInstance])

  // fetch election
  useEffect(() => {
    if (election || !id || loaded || !client) return
    ;(async () => {
      setLoading(true)
      try {
        const e = await client.fetchElection(id)
        setLoaded(true)
        setElection(e)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    })()
  }, [election, id, loaded, client])

  // set loaded in case election comes from props
  useEffect(() => {
    if (loaded || !data) return

    setLoaded(true)
  }, [data, loaded])

  // check if logged in user is able to vote
  useEffect(() => {
    if (!fetchCensus || !signer || !election || !loaded || !client || isAbleToVote !== undefined) return
    ;(async () => {
      const censusType: CensusType = election.census.type
      const isIn = await client.isInCensus(election.id)
      let left = 0
      if (isIn || censusType == CensusType.WEIGHTED) {
        // no need to check votes left if member ain't in census
        left = await client.votesLeftCount(election.id)
        setVotesLeft(left)

        const voted = await client.hasAlreadyVoted(election.id)
        setVoted(voted)
      }
      setCensusType(censusType)
      setIsInCensus(isIn)
      setIsAbleToVote((left > 0 && isIn) || censusType == CensusType.CSP)
    })()
  }, [fetchCensus, election, loaded, client, isAbleToVote, signer])

  // CSP OAuth flow
  // Listening for the popup window meessage (oauth flows)
  useEffect(() => {
    ;(async () => {
      const handleMessage = (event: any) => {
        if (event.data.code && event.data.handler) {
          getOAuthToken(client, event.data.code, event.data.handler);
        }
      };
    
      if (window.opener || !client || censusType !== CensusType.CSP) {
        return;
      }

      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    })()
  },[client, censusType])
  
  // CSP OAuth flow
  // Posting the message to the main window
  useEffect(() => {
    (async () => {
      if (typeof window == 'undefined') return
      if (window.location.href.split('?').length < 2) return

      const code = window.location.href.split('?')[1].split('&').find((param: string) => param.startsWith('code='))?.split('=')[1]
      const handler = window.location.href.split('?')[1].split('&').find((param: string) => param.startsWith('handler='))?.split('=')[1]
      if(!code || !handler) return

      if(window.opener) {
        // If it is, send the code to the parent window and close the popup
        window.opener.postMessage({ code, handler }, '*')
        window.close()
      }
    })()
  },[])
  
  // context vote function (the one to be used with the given components)
  const vote = async (values: FieldValues) => {
    if (!client) {
      throw new Error('no client initialized')
    }
    if (!signer) {
      throw new Error('no signer provided')
    }
    if (!election) {
      throw new Error('no election initialized')
    }

    setVoting(true)
    setError('')

    client.setElectionId(election.id)
    // map questions back to expected Vote[] values
    const mapped = election.questions.map((q, k) => parseInt(values[k.toString()], 10))

    let vote = new Vote(mapped)
    setVoteInstance(vote)
    if (typeof beforeSubmit === 'function' && !beforeSubmit(vote)) {
      return
    }

    try {
      let vid;
      if (censusType == CensusType.CSP) {
        await cspAuthAndVote()
      }else if (censusType == CensusType.WEIGHTED) {
        vid = await weightedVote(vote)
        setVoted(vid)
        setVotesLeft(votesLeft - 1)
        setIsAbleToVote(isInCensus && votesLeft - 1 > 0)
      }
    } catch (e: any) {
      if ('reason' in e) {
        return setError(e.reason as string)
      }
      if ('message' in e) {
        return setError(e.message as string)
      }
      console.error('could not vote:', e)
    } finally {
      setVoting(false)
    }
  }

  const weightedVote = async (vote: Vote): Promise<string> => {
    if (!vote) {
      throw new Error('no vote instance')
    }
    if( censusType != CensusType.WEIGHTED ){
      throw new Error('not a Weighted election')
    }

    return await client.submitVote(vote)
  }

  // CSP OAuth flow
  const cspAuthAndVote = async () => {
    if ( !client ) {
      throw new Error('no client initialized')
    }
    if (!election) {
      throw new Error('no election initialized')
    }
    if( censusType != CensusType.CSP ){
      throw new Error('not a CSP election')
    }

    let redirectURL = `${window.location.href}`
    // Add electionId and handler to the redirectURL if it is not there
    if(!redirectURL.includes(`electionId=${election.id}`)){
      redirectURL.includes('?') ? redirectURL += `&electionId=${election.id}` : redirectURL += `?electionId=${election.id}`
    }
    if(!redirectURL.includes(`handler=${handler}`)){
      redirectURL.includes('?') ? redirectURL += `&handler=${handler}` : redirectURL += `?handler=${handler}`
    }
    
    let step0: any;
    try {
      step0 = await client.cspStep(0, [handler, redirectURL])
    } catch (e: any) {
      if ('reason' in e) {
        return setError(e.reason as string)
      }
    }

    setAuthToken(step0.authToken)
    openLoginPopup(handler, step0['response'][0])
  }

  // CSP OAuth flow
  // Opens a popup window to the service login page
  const openLoginPopup = (handler: string, url: string) => {
    const width = 600
    const height = 600
    const left = (window.outerWidth / 2) - (width / 2)
    const top = (window.outerHeight / 2) - (height / 2)
    const params = [
      `width=${width}`,
      `height=${height}`,
      `top=${top}`,
      `left=${left}`,
      `status=no`,
      `resizable=yes`,
      `scrollbars=yes`,
    ].join(',')

    window.open(url, handler, params)
  }

  // CSP OAuth flow
  const getOAuthToken = async (vocdoniClient: any, code: string, handler: string) => {
    if(cspVotingToken) {
      return
    }

    if (!code) {
      throw new Error('no code provided')
    }
    if (!handler) {
      throw new Error('no handler provided')
    }

    // Extract the electionId query param from the redirectURL
    const electionId = window.location.href.split('?')[1].split('&').find((param: string) => param.startsWith('electionId='))?.split('=')[1]
    let redirectURL = `${window.location.href.split('?')[0]}?electionId=${electionId}&handler=${handler}`
    let step1;
    try {
      step1 = await vocdoniClient.cspStep(1, [handler, code, redirectURL], authToken)
      setCspVotingToken(step1.token)
    } catch(e) {
      setError("Not authorized to vote")
      return false;
    }
  }

  const cspVote = async (token: string, vote: Vote) => {
    if (!client) {
      throw new Error('no client initialized')
    }
    
    if(censusType != CensusType.CSP){
      throw new Error('not a CSP election')
    }
    
    try {
      const walletAddress: string = await client.wallet?.getAddress() as string
      const signature: string = await client.cspSign(walletAddress, token)
      const cspVote: CspVote = client.cspVote(vote as Vote, signature)
      const vid: string = await client.submitVote(cspVote)
      setVoted(vid)
      setVotesLeft(votesLeft - 1)
      setCspVotingToken(undefined)
      setVoteInstance(undefined)
      return vid
    } catch(e) {
      setError("Error submitting vote")
      return false;
    }
  }

  return {
    ...rest,
    election,
    error,
    isAbleToVote,
    isInCensus,
    loading,
    signer,
    trans,
    vote,
    voted,
    votesLeft,
    voting,
  }
}

export type ElectionState = ReturnType<typeof useElectionProvider>

export const ElectionContext = createContext<ElectionState | undefined>(undefined)

export const useElection = () => {
  const ctxt = useContext(ElectionContext)
  if (!ctxt) {
    throw new Error(
      'useElection returned `undefined`, maybe you forgot to wrap the component within <ElectionProvider />?'
    )
  }

  return ctxt
}

export type ElectionProviderComponentProps = ElectionProviderProps & ChakraProps

export const ElectionProvider = ({ children, ...rest }: PropsWithChildren<ElectionProviderComponentProps>) => {
  const value = useElectionProvider(rest)

  return <ElectionContext.Provider value={value}>{children}</ElectionContext.Provider>
}
ElectionProvider.displayName = 'ElectionProvider'

export const Election = (props: ElectionProviderComponentProps) => (
  <ElectionProvider {...props} fetchCensus>
    <ElectionHeader />
    <ElectionTitle />
    <ElectionSchedule />
    <ElectionStatusBadge />
    <ElectionActions />
    <ElectionDescription />
    <HR />
    <ElectionQuestions />
    <VoteButton />
    <ElectionResults />
  </ElectionProvider>
)
Election.displayName = 'Election'
