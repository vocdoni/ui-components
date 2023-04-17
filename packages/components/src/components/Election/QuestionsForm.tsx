import { Alert, AlertIcon } from '@chakra-ui/alert'
import { useMultiStyleConfig } from '@chakra-ui/system'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useElection } from './Election'
import { QuestionField } from './QuestionField'

export const QuestionsForm = () => {
  const { election, signer, vote, voted, ConnectButton, error, loading, trans } = useElection()
  const fmethods = useForm()
  const styles = useMultiStyleConfig('Questions')
  const questions = election?.questions

  if (voted) {
    return (
      <Alert variant='solid' status='info'>
        {trans('voted', 'You already voted. Your vote id is %id')?.replace('%id', voted)}
      </Alert>
    )
  }

  if (!questions || (questions && !questions?.length)) {
    return (
      <Alert variant='solid' status='warning' sx={styles.alert}>
        <AlertIcon />
        {trans('empty', 'Apparently this process has no questions 🤔')}
      </Alert>
    )
  }

  const initialValues: any = questions.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.title.default]: '',
    }),
    {}
  )

  const onSubmit = async (values: FieldValues) => await vote(values)

  return (
    <FormProvider {...fmethods}>
      <form onSubmit={fmethods.handleSubmit(onSubmit)} id='election-questions-form'>
        {questions.map((question, qk) => (
          <QuestionField key={qk} question={question} />
        ))}
        {error && (
          <Alert status='error' variant='solid' mb={3}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </form>
    </FormProvider>
  )
}
