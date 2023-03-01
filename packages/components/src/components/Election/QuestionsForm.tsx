import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { Signer } from '@ethersproject/abstract-signer'
import { PublishedElection } from '@vocdoni/sdk'
import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { useElectionContext } from './Election'
import { QuestionField } from './QuestionField'

type QuestionsFormProps = ChakraProps & {
  election?: PublishedElection
  signer?: Signer
}

export const QuestionsForm = () => {
  const {election, signer, vote, ConnectButton, error, loading} = useElectionContext()
  const styles = useMultiStyleConfig('Questions')
  const questions = election?.questions

  const [disabled, setDisabled] = useState<boolean>(false)
  const isDisabled = !signer || disabled || loading

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
  const validationSchema : any = Yup.object(questions.reduce((prev, curr) => ({
    ...prev,
    [curr.title.default]: Yup.string().required('This field is required')
  }), {}))

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await vote(values)
      }}
    >
      {({handleSubmit, errors, touched}) => (
        <form onSubmit={handleSubmit}>
          {
            questions.map((question, qk) => (
              <QuestionField
                key={qk}
                question={question}
                error={errors[question.title.default]}
                touched={touched[question.title.default]}
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
              <Button type='submit' sx={styles.button} disabled={isDisabled}>
                Vote
              </Button>
            )
          }
        </form>
      )}
    </Formik>
  )
}
