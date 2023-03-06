import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { PublishedElection } from '@vocdoni/sdk'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useElectionContext } from './Election'
import { QuestionField } from './QuestionField'

type QuestionsFormProps = ChakraProps & {
  election?: PublishedElection
  signer?: Signer
}

export const QuestionsForm = () => {
  const { election, signer, vote, voted, ConnectButton, error, loading } = useElectionContext()
  const fmethods = useForm()
  const styles = useMultiStyleConfig('Questions')
  const { formState: { isSubmitting } } = fmethods
  const questions = election?.questions

  if (voted.length) {
    return (
      <Alert variant='solid' status='info'>
        You already voted. Your vote id is {voted}
      </Alert>
    )
  }

  const isDisabled = !signer || loading || isSubmitting

  if (!questions || (questions && !questions?.length)) {
    return (
      <Alert variant='solid' status='warning' sx={styles.alert}>
        <AlertIcon />Apparently this process has no questions 🤔
      </Alert>
    )
  }

  const initialValues : any = questions.reduce((prev, curr) => ({
    ...prev,
    [curr.title.default]: '',
  }), {})

  const onSubmit = async (values: FieldValues) => await vote(values)

  return (
    <FormProvider {...fmethods}>
      <form onSubmit={fmethods.handleSubmit(onSubmit)}>
        {
          questions.map((question, qk) => (
            <QuestionField
              key={qk}
              question={question}
            />
          ))
        }
        {
          error && (
            <Alert status='error' variant='solid' mb={3}>
              <AlertIcon />{error}
            </Alert>
          )
        }
        {
          !signer && ConnectButton ? <ConnectButton /> : (
            <Button
              type='submit'
              sx={styles.button}
              disabled={isDisabled}
              isLoading={isSubmitting}
            >
              Vote
            </Button>
          )
        }
      </form>
    </FormProvider>
  )
}
