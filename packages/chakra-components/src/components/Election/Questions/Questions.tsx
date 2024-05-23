import { Alert, AlertIcon } from '@chakra-ui/alert'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'
import { IQuestion, PublishedElection } from '@vocdoni/sdk'
import { FieldValues, SubmitErrorHandler } from 'react-hook-form'
import { QuestionField } from './Fields'
import { QuestionsFormProvider, QuestionsFormProviderProps, useQuestionsForm } from './Form'
import { Voted } from './Voted'

export type ElectionQuestionsFormProps = ChakraProps & {
  onInvalid?: SubmitErrorHandler<FieldValues>
}

export type ElectionQuestionsProps = ElectionQuestionsFormProps & QuestionsFormProviderProps

export const ElectionQuestions = ({ confirmContents, ...props }: ElectionQuestionsProps) => (
  <QuestionsFormProvider {...{ confirmContents }}>
    <ElectionQuestionsForm {...props} />
  </QuestionsFormProvider>
)

export const ElectionQuestionsForm = (props: ElectionQuestionsFormProps) => {
  const {
    election,
    voted,
    errors: { voting: error },
    localize,
    isAbleToVote,
  } = useElection()
  const { fmethods, vote } = useQuestionsForm()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const questions: IQuestion[] | undefined = (election as PublishedElection)?.questions
  const { onInvalid, ...rest } = props

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
    <chakra.div __css={styles.wrapper} {...rest}>
      <Voted />
      <form onSubmit={fmethods.handleSubmit(vote, onInvalid)} id={`election-questions-${election.id}`}>
        {questions.map((question, qk) => (
          <QuestionField key={qk} index={qk.toString()} question={question} />
        ))}
        {error && (
          <Alert status='error' variant='solid' mb={3}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </form>
    </chakra.div>
  )
}
