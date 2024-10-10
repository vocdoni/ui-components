import { Alert, AlertIcon } from '@chakra-ui/alert'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'
import { IQuestion, PublishedElection } from '@vocdoni/sdk'
import { FieldValues, SubmitErrorHandler } from 'react-hook-form'
import { QuestionField } from './Fields'
import { DefaultElectionFormId, QuestionsFormProvider, QuestionsFormProviderProps, useQuestionsForm } from './Form'
import { QuestionsTypeBadge } from './TypeBadge'
import { Voted } from './Voted'

export type ElectionQuestionsFormProps = ChakraProps & {
  onInvalid?: SubmitErrorHandler<FieldValues>
  formId?: string
}

export type ElectionQuestionsProps = ElectionQuestionsFormProps & QuestionsFormProviderProps

export const ElectionQuestions = ({ confirmContents, ...props }: ElectionQuestionsProps) => (
  <QuestionsFormProvider {...{ confirmContents }}>
    <ElectionQuestionsForm {...props} />
  </QuestionsFormProvider>
)

export const ElectionQuestionsForm = ({ formId, onInvalid, ...rest }: ElectionQuestionsFormProps) => {
  const methods = useQuestionsForm()
  const { fmethods, vote } = methods
  return (
    <form onSubmit={fmethods.handleSubmit(vote, onInvalid)} id={formId ?? DefaultElectionFormId}>
      <ElectionQuestion {...methods} {...rest} />
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
    return <Voted />
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
