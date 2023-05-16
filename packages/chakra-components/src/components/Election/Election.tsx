import { ChakraProps } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { PublishedElection, Vote } from '@vocdoni/sdk'
import { ComponentType, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useClient } from '../../client'
import { HR } from '../layout'
import { ElectionActions } from './Actions'
import { ElectionDescription } from './Description'
import { ElectionFormError } from './FormError'
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
  autoUpdateInterval?: number
  autoUpdate?: boolean
}

export const useElectionProvider = ({
  id,
  election: data,
  signer: s,
  fetchCensus,
  beforeSubmit,
  autoUpdateInterval,
  autoUpdate,
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
  const [formError, setFormError] = useState<boolean>(false)

  // set signer in case it has been specified in the election
  // provider (rather than the client provider). Not sure if this is useful tho...
  useEffect(() => {
    if (!client || signer || !s) return

    setSigner(s)
  }, [signer, client, s])

  const fetchElection = async (id: string) => {
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
  }

  // fetch election
  useEffect(() => {
    if (election || !id || loaded || loading || !client) return

    fetchElection(id)
  }, [election, id, loaded, client])

  // set loaded in case election comes from props
  useEffect(() => {
    if (loaded || !data) return

    setLoaded(true)
  }, [data, loaded])

  // check if logged in user is able to vote
  useEffect(() => {
    if (!fetchCensus || !signer || !election || !loaded || loading || !client || isAbleToVote !== undefined) return
    ;(async () => {
      setLoading(true)
      const isIn = await client.isInCensus(election.id)
      setIsInCensus(isIn)

      let left = 0
      if (isIn) {
        // no need to check votes left if member ain't in census
        left = await client.votesLeftCount(election.id)
        setVotesLeft(left)

        const voted = await client.hasAlreadyVoted(election.id)
        setVoted(voted)
      }
      setIsAbleToVote(left > 0 && isIn)
      setLoading(false)
    })()
  }, [fetchCensus, election, loaded, client, isAbleToVote, signer])

  // auto update metadata (if enabled)
  useEffect(() => {
    if (!autoUpdate || !(election && election.id)) return

    const interval = setInterval(() => fetchElection(election.id), autoUpdateInterval || 30000)

    return () => clearInterval(interval)
  }, [autoUpdate, autoUpdateInterval])

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

    try {
      const vote = new Vote(mapped)
      if (typeof beforeSubmit === 'function' && !beforeSubmit(vote)) {
        return
      }

      const vid = await client.submitVote(vote)
      setVoted(vid)
      setVotesLeft(votesLeft - 1)
      setIsAbleToVote(isInCensus && votesLeft - 1 > 0)

      return vid
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
      // fetch election metadata to retrieve results and other useful updated information
      fetchElection(election.id)
    }
  }

  return {
    ...rest,
    election,
    error,
    formError,
    isAbleToVote,
    isInCensus,
    loading,
    setFormError,
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
    <ElectionFormError />
    <VoteButton />
    <ElectionResults />
  </ElectionProvider>
)
Election.displayName = 'Election'