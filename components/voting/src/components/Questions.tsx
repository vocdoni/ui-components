import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { IQuestion } from '@vocdoni/sdk'
import { Formik } from 'formik'
import { ReactNode } from 'react'
import * as Yup from 'yup'
import Question from './Question'

type QuestionsProps = ChakraProps & {
  questions?: IQuestion[]
  buttonAs?: ReactNode
}

const BaseQuestions = ({questions, ...rest}: QuestionsProps) => {
  const styles = useMultiStyleConfig('Questions')

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
    <chakra.div __css={styles.wrapper} {...rest}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // remap values back to expected SDK format
          const mapped = questions.map((q) => values[q.title.default])
          console.log('received:', mapped)
        }}
      >
        {({handleSubmit, errors, touched}) => (
          <form onSubmit={handleSubmit}>
            {
              questions.map((question, qk) => (
                <Question
                  key={qk}
                  question={question}
                  error={errors[question.title.default]}
                  touched={touched[question.title.default]}
                />
              ))
            }
            <Button type='submit' sx={styles.button}>Vote</Button>
          </form>
        )}
      </Formik>
    </chakra.div>
  )
}

const Questions = chakra(BaseQuestions)
Questions.displayName = 'Questions'

export default Questions
