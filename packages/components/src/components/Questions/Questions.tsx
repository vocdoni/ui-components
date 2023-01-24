import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { EnvOptions, PublishedElection, VocdoniSDKClient, Vote } from '@vocdoni/sdk'
import { ComponentType, createContext, useContext, useState } from 'react'
import { QuestionsForm } from './QuestionsForm'

export type QuestionsProviderProps = {
  election: PublishedElection
  signer?: Signer
  ConnectButton?: ComponentType
}

export const useQuestionsProvider = ({election, signer, ...rest}: QuestionsProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [voted, setVoted] = useState<string>('')
  const [error, setError] = useState<string>('')

  const vote = async (values: {[key:string]:string}) => {
    if (!signer) {
      throw new Error('no signer provided')
    }
    setLoading(true)
    const mapped = election.questions.map((q) => parseInt(values[q.title.default], 10))
    const client = new VocdoniSDKClient({
      env: EnvOptions.DEV,
      wallet: signer,
      electionId: election.id,
    })

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

export type QuestionsState = ReturnType<typeof useQuestionsProvider>

export const QuestionsContext = createContext<QuestionsState | undefined>(undefined)

export const useQuestionsContext = () => {
  const ctxt = useContext(QuestionsContext)
  if (!ctxt) {
    throw new Error('useQuestions returned `undefined`, maybe you forgot to wrap the component within <QuestionsProvider />?')
  }

  return ctxt
}

export type QuestionsProps = QuestionsProviderProps & ChakraProps

export const Questions = ({election, signer, ConnectButton, ...rest}: QuestionsProps) => {
  const value = useQuestionsProvider({election, signer, ConnectButton})
  const styles = useMultiStyleConfig('Questions')

  return (
    <QuestionsContext.Provider value={value}>
      <chakra.div __css={styles.wrapper} {...rest}>
        <QuestionsForm />
      </chakra.div>
    </QuestionsContext.Provider>
  )
}

Questions.displayName = 'Questions'
