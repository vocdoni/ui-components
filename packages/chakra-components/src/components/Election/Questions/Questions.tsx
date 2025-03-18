import { Alert, AlertIcon, chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { IQuestion, PublishedElection } from '@vocdoni/sdk'
import { FieldValues, SubmitErrorHandler } from 'react-hook-form'
import { QuestionsEmpty } from './Empty'
import { ElectionQuestion } from './Fields'
import { QuestionsFormProvider, QuestionsFormProviderProps, useQuestionsForm } from './Form'
import { QuestionsTypeBadge } from './TypeBadge'
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
  const { election } = useElection()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const { onInvalid, ...rest } = props

  if (!(election instanceof PublishedElection)) return null

  return (
    <chakra.div __css={styles.wrapper} {...rest}>
      <QuestionsFormContents onInvalid={onInvalid} />
    </chakra.div>
  )
}

const QuestionsFormContents = ({ onInvalid }: ElectionQuestionsFormProps) => {
  const {
    election,
    voted,
    errors: { voting: error },
    isAbleToVote,
  } = useElection()
  const { fmethods, vote } = useQuestionsForm()
  const questions: IQuestion[] | undefined = (election as PublishedElection)?.questions

  if (voted && !isAbleToVote) {
    return <Voted />
  }

  if (!questions || (questions && !questions?.length)) {
    return <QuestionsEmpty />
  }

  return (
    <form onSubmit={fmethods.handleSubmit(vote, onInvalid)} id={`election-questions-${election.id}`}>
      <QuestionsTypeBadge />
      {questions.map((question, qk) => (
        <ElectionQuestion key={qk} index={qk.toString()} question={question} />
      ))}
      {error && (
        <Alert status='error' variant='solid' mb={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </form>
  )
}
