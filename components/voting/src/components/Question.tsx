import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { IQuestion } from '@vocdoni/sdk'
import { Field, FormikErrors, FormikTouched } from 'formik'
import Markdown from './layout/Markdown'

interface QuestionProps {
  question: IQuestion,
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[],
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[],
}

const BaseQuestion = ({question, error, touched}: QuestionProps) => {
  const styles = useMultiStyleConfig('Questions')

  return (
    <chakra.div __css={styles.question}>
      <FormControl isInvalid={!!error && !!touched}>
        <chakra.label __css={styles.title}>
          {question.title.default}
        </chakra.label>
        {
          question.description &&
          <chakra.div __css={styles.description}>
            <Markdown>
              {question.description.default}
            </Markdown>
          </chakra.div>
        }
        <RadioGroup variant='voting' name={question.title.default}>
          <Stack direction='column'>
            {
              question.choices.map((choice, ck) => (
                <Field
                  key={ck}
                  as={Radio}
                  variant='voting'
                  value={choice.value.toString()}
                >
                  {choice.title.default}
                </Field>
              ))
            }
          </Stack>
          <FormErrorMessage variant='voting'>{error?.toString()}</FormErrorMessage>
        </RadioGroup>
      </FormControl>
    </chakra.div>
  )
}

const Question = chakra(BaseQuestion)
Question.displayName = 'Question'

export default Question
