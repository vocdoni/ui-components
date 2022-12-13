import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { chakra } from '@chakra-ui/system'
import { IQuestion } from '@vocdoni/sdk'
import { Field, FormikErrors, FormikTouched } from 'formik'
import Markdown from './layout/Markdown'
import VariantBox from './layout/VariantBox'

interface QuestionProps {
  question: IQuestion,
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[],
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[],
  plainText?: boolean
}

const BaseQuestion = ({question, error, touched, plainText}: QuestionProps) => {
  return (
    <VariantBox variant='question'>
      <FormControl isInvalid={!!error && !!touched}>
        <FormLabel variant='question-title'>
          {question.title.default}
        </FormLabel>
        <Markdown plainText={plainText}>
          {question.description?.default}
        </Markdown>
        <RadioGroup name={question.title.default}>
          <Stack direction='column'>
            {
              question.choices.map((choice, ck) => (
                <Field
                  key={ck}
                  as={Radio}
                  value={choice.value.toString()}
                >
                  {choice.title.default}
                </Field>
              ))
            }
          </Stack>
          <FormErrorMessage>{error?.toString()}</FormErrorMessage>
        </RadioGroup>
      </FormControl>
    </VariantBox>
  )
}

const Question = chakra(BaseQuestion)
Question.displayName = 'Question'

export default Question
