import { ChakraProps } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { PublishedElection, Vote } from '@vocdoni/sdk'
import { ComponentType, createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useClientContext } from '../../client'
import { HR } from '../layout'
import { ElectionDescription, ElectionHeader, ElectionSchedule, ElectionStatusBadge, ElectionTitle } from './parts'
import { QuestionsForm } from './QuestionsForm'
import { VoteButton } from './VoteButton'

export type ElectionProviderProps = {
  id?: string
  election?: PublishedElection
  signer?: Wallet | Signer
  ConnectButton?: ComponentType
  fetchCensus?: boolean
}

export const useElectionProvider = ({ id, election: data, signer: s, fetchCensus, ...rest }: ElectionProviderProps) => {
  const { client, signer, setSigner } = useClientContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [voting, setVoting] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [voted, setVoted] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [election, setElection] = useState<PublishedElection | undefined>(data)
  const [isAbleToVote, setIsAbleToVote] = useState<boolean | undefined>(undefined)
  const [hasAlreadyVoted, setHasAlreadyVoted] = useState<boolean | undefined>(undefined)
  const [votesLeft, setVotesLeft] = useState<number>(0)
  const [isInCensus, setIsInCensus] = useState<boolean>(false)

  // set signer in case it has been specified in the election
  // provider (rather than the client provider)
  useEffect(() => {
    if (!client || signer || !s) return

    setSigner(s)
  }, [signer, client, s])

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
      const isIn = await client.isInCensus(election.id)
      let left = 0
      let hasVoted = false
      if (isIn) {
        // no need to check votes left if member ain't in census
        left = await client.votesLeftCount(election.id)
        hasVoted = await client.hasAlreadyVoted(election.id)
      }
      setVotesLeft(left)
      setIsInCensus(isIn)
      setHasAlreadyVoted(hasVoted)
      setIsAbleToVote(left > 0 && isIn)
    })()
  }, [fetchCensus, election, loaded, client, isAbleToVote, signer])

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
    const mapped = election.questions.map((q) => parseInt(values[q.title.default], 10))

    try {
      const vote = new Vote(mapped)
      const vid = await client.submitVote(vote)
      setVoted(vid)

      return vid
    } catch (e: any) {
      if ('reason' in e) {
        setError(e.reason as string)
      }
      if ('message' in e) {
        setError(e.message as string)
      }
      console.error('could not vote:', e)
    } finally {
      setVoting(false)
    }
  }

  return {
    ...rest,
    election,
    error,
    hasAlreadyVoted,
    isAbleToVote,
    isInCensus,
    loading,
    signer,
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
    <ElectionDescription />
    <HR />
    <QuestionsForm />
    <VoteButton />
  </ElectionProvider>
)
Election.displayName = 'Election'
