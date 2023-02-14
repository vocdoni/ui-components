import { ChakraProps } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { PublishedElection, Vote } from '@vocdoni/sdk'
import { ComponentType, createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { useClientContext } from '../../client'
import { ElectionDate, ElectionDescription, ElectionHeader, ElectionSeparator, ElectionTitle } from './parts'
import { QuestionsForm } from './QuestionsForm'

export type ElectionProviderProps = {
  id?: string
  election?: PublishedElection
  signer?: Signer
  ConnectButton?: ComponentType
}

export const useElectionProvider = ({id, election: data, signer, ...rest}: ElectionProviderProps) => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ loaded, setLoaded ] = useState<boolean>(false)
  const [ voted, setVoted ] = useState<string>('')
  const [ error, setError ] = useState<string>('')
  const [ election, setElection ] = useState<PublishedElection|undefined>(data)
  const { client } = useClientContext()

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

  const vote = async (values: {[key:string]:string}) => {
    if (!client) {
      throw new Error('no client initialized')
    }
    if (!signer) {
      throw new Error('no signer provided')
    }
    if (!election) {
      throw new Error('no election initialized')
    }
    setLoading(true)
    const mapped = election.questions.map((q) => parseInt(values[q.title.default], 10))

    try {
      const vote = new Vote(mapped)
      const vid = await client.submitVote(vote)
      setVoted(vid)

      return vid
    } catch (e) {
      throw e
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

export const useElectionContext = () => {
  const ctxt = useContext(ElectionContext)
  if (!ctxt) {
    throw new Error('useElectionContext returned `undefined`, maybe you forgot to wrap the component within <ElectionProvider />?')
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

export const Election = (props : ElectionProviderComponentProps) => {
  return (
    <ElectionProvider {...props}>
      <ElectionHeader />
      <ElectionTitle />
      <ElectionDate />
      <ElectionDescription />
      <ElectionSeparator />
      <QuestionsForm />
    </ElectionProvider>
  )
}
Election.displayName = 'Election'
