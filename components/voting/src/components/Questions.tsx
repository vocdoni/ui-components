import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { chakra } from '@chakra-ui/system'
import { IQuestion } from '@vocdoni/sdk'
import { Formik } from 'formik'
import { ReactNode } from 'react'
import * as Yup from 'yup'
import VariantBox from './layout/VariantBox'
import Question from './Question'

type QuestionsProps = {
  questions?: IQuestion[]
  plainText?: boolean
  buttonAs?: ReactNode
}

const BaseQuestions = ({questions, plainText}: QuestionsProps) => {
  if (!questions || (questions && !questions?.length)) {
    return (
      <Alert variant='solid' status='info'>
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
    <VariantBox variant='questions'>
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
                  plainText={plainText}
                />
              ))
            }
            <Button type='submit'>Vote</Button>
          </form>
        )}
      </Formik>
    </VariantBox>
  )
}

const Questions = chakra(BaseQuestions)
Questions.displayName = 'Questions'

export default Questions
