import { Alert, AlertIcon } from '@chakra-ui/alert'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { ElectionProvider, ElectionState, useElection } from '@vocdoni/react-providers'
import { IQuestion, PublishedElection } from '@vocdoni/sdk'
import { FieldValues, SubmitErrorHandler, ValidateResult } from 'react-hook-form'
import { QuestionField } from './Fields'
import { QuestionsFormProvider, QuestionsFormProviderProps, useQuestionsForm } from './Form'
import { QuestionsTypeBadge } from './TypeBadge'
import { MultiElectionVoted, Voted } from './Voted'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { useEffect, useMemo, useState } from 'react'

export type RenderWith = {
  id: string
}

export type SubmitFormValidation = (values: Record<string, FieldValues>) => ValidateResult | Promise<ValidateResult>

export type ElectionQuestionsFormProps = ChakraProps & {
  onInvalid?: SubmitErrorHandler<FieldValues>
  formId?: string
}

export type ElectionQuestionsProps = ElectionQuestionsFormProps & QuestionsFormProviderProps

export const ElectionQuestions = ({ confirmContents, ...props }: ElectionQuestionsProps) => {
  return (
    <QuestionsFormProvider {...{ confirmContents }}>
      <ElectionQuestionsForm {...props} />
    </QuestionsFormProvider>
  )
}

export const ElectionQuestionsForm = ({ formId, onInvalid, ...rest }: ElectionQuestionsFormProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const { fmethods, voteAll, validate, renderWith, voted, isAbleToVote } = useQuestionsForm()
  const { ConnectButton, election } = useElection() // use Root election information
  const [globalError, setGlobalError] = useState('')

  const { handleSubmit, watch } = fmethods
  const formData = watch()

  const onSubmit = (values: Record<string, FieldValues>) => {
    if (validate) {
      const error = validate(formData)
      if (typeof error === 'string' || (typeof error === 'boolean' && !error)) {
        setGlobalError(error.toString())
        return
      }
      setGlobalError('')
    }
    voteAll(values)
  }

  if (!(election instanceof PublishedElection)) return null

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} id={formId ?? `election-questions-${election.id}`}>
      <chakra.div __css={styles.elections}>
        <MultiElectionVoted />
        <ElectionQuestion {...rest} />
        {renderWith?.length > 0 &&
          renderWith.map(({ id }) => (
            <ElectionProvider key={id} ConnectButton={ConnectButton} id={id} fetchCensus>
              <SubElectionQuestions {...rest} />
            </ElectionProvider>
          ))}
      </chakra.div>
      <FormControl isInvalid={!!globalError}>
        <FormErrorMessage sx={styles.error}>{globalError}</FormErrorMessage>
      </FormControl>
    </form>
  )
}

export const ElectionQuestion = (props: ChakraProps) => {
  const {
    election,
    voted,
    errors: { voting: error },
    localize,
    isAbleToVote,
  } = useElection()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const questions: IQuestion[] | undefined = (election as PublishedElection)?.questions

  if (!(election instanceof PublishedElection)) return null

  if (voted && !isAbleToVote) {
    return null
  }

  if (!questions || (questions && !questions?.length)) {
    return (
      <Alert variant='subtle' status='warning' sx={styles.alert}>
        <AlertIcon />
        {localize('empty')}
      </Alert>
    )
  }

  return (
    <chakra.div __css={styles.wrapper} {...props}>
      <Voted />
      <chakra.div __css={styles.typeBadgeWrapper}>
        <QuestionsTypeBadge />
      </chakra.div>
      {questions.map((question, qk) => (
        <QuestionField key={qk} index={`${election.id}.${qk.toString()}`} question={question} />
      ))}
      {error && (
        <Alert status='error' variant='solid' mb={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </chakra.div>
  )
}

export type SubElectionState = { election: PublishedElection } & Pick<ElectionState, 'vote' | 'isAbleToVote' | 'voted'>
export type ElectionStateStorage = Record<string, SubElectionState>

export const SubElectionQuestions = (props: ChakraProps) => {
  const { rootClient, addElection, elections } = useQuestionsForm()
  const { election, setClient, vote, connected, clearClient, isAbleToVote, voted } = useElection()

  const subElectionState: SubElectionState | null = useMemo(() => {
    if (!election || !(election instanceof PublishedElection)) return null
    return {
      vote,
      election,
      isAbleToVote,
      voted,
    }
  }, [vote, election, isAbleToVote, voted])

  // clear session of local context when login out
  useEffect(() => {
    if (connected) return
    clearClient()
  }, [connected])

  // ensure the client is set to the root one
  useEffect(() => {
    setClient(rootClient)
  }, [rootClient, election])

  // Add the election to the state cache
  useEffect(() => {
    if (!subElectionState || !subElectionState.election) return
    const actualState = elections[subElectionState.election.id]
    if (subElectionState.vote === actualState?.vote || subElectionState.isAbleToVote === actualState?.isAbleToVote) {
      return
    }
    addElection(subElectionState)
  }, [subElectionState, elections, election])

  return <ElectionQuestion {...props} />
}
