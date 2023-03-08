import { ChakraProps } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { Wallet } from '@ethersproject/wallet'
import { PublishedElection, Vote } from '@vocdoni/sdk'
import { ComponentType, createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { useClientContext } from '../../client'
import { HR } from '../layout'
import {
  ElectionDescription,
  ElectionHeader,
  ElectionSchedule, ElectionStatusBadge,
  ElectionTitle
} from './parts'
import { QuestionsForm } from './QuestionsForm'

export type ElectionProviderProps = {
  id?: string
  election?: PublishedElection
  signer?: Wallet | Signer
  ConnectButton?: ComponentType
}

export const useElectionProvider = ({id, election: data, signer: s, ...rest}: ElectionProviderProps) => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ loaded, setLoaded ] = useState<boolean>(false)
  const [ voted, setVoted ] = useState<string>('')
  const [ error, setError ] = useState<string>('')
  const [ election, setElection ] = useState<PublishedElection|undefined>(data)
  const { client, signer, setSigner } = useClientContext()

  // set signer in case it has been specified in the election
  // provider (rather than the client provider)
  useEffect(() => {
    if (!client || signer || !s) return

    setSigner(s)
  }, [signer, client, s])

  useEffect(() => {
    if (election || data || !id || loaded || !client) return

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

    client.setElectionId(election.id)

    setLoading(true)
    setError('')

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
      setLoading(false)
    }
  }

  return {
    ...rest,
    election,
    error,
    loading,
    setError,
    signer,
    vote,
    voted,
  }
}

export type ElectionState = ReturnType<typeof useElectionProvider>

export const ElectionContext = createContext<ElectionState | undefined>(undefined)

export const useElection = () => {
  const ctxt = useContext(ElectionContext)
  if (!ctxt) {
    throw new Error('useElection returned `undefined`, maybe you forgot to wrap the component within <ElectionProvider />?')
  }

  return ctxt
}

export type ElectionProviderComponentProps = ElectionProviderProps & ChakraProps

export const ElectionProvider = ({children, ...rest}: PropsWithChildren<ElectionProviderComponentProps>) => {
  const value = useElectionProvider(rest)

  return (
    <ElectionContext.Provider value={value}>
      {children}
    </ElectionContext.Provider>
  )
}
ElectionProvider.displayName = 'ElectionProvider'

export const Election = (props : ElectionProviderComponentProps) => (
  <ElectionProvider {...props}>
    <ElectionHeader />
    <ElectionTitle />
    <ElectionSchedule />
    <ElectionStatusBadge />
    <ElectionDescription />
    <HR />
    <QuestionsForm showVoteButton />
  </ElectionProvider>
)
Election.displayName = 'Election'
