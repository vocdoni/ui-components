import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { IQuestion } from '@vocdoni/sdk'
import { Field, FormikErrors, FormikTouched } from 'formik'
import { Markdown } from '../layout'

type QuestionProps = ChakraProps & {
  question: IQuestion,
  error?: string | string[] | FormikErrors<any> | FormikErrors<any>[],
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[],
}

export const Question = ({question, error, touched, ...rest}: QuestionProps) => {
  const styles = useMultiStyleConfig('Questions')

  return (
    <chakra.div __css={styles.question} {...rest}>
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
        <RadioGroup name={question.title.default} sx={styles.radioGroup}>
          <Stack direction='column' sx={styles.stack}>
            {
              question.choices.map((choice, ck) => (
                <Field
                  key={ck}
                  as={Radio}
                  value={choice.value.toString()}
                  sx={styles.radio}
                >
                  {choice.title.default}
                </Field>
              ))
            }
          </Stack>
          <FormErrorMessage sx={styles.error}>{error?.toString()}</FormErrorMessage>
        </RadioGroup>
      </FormControl>
    </chakra.div>
  )
}

Question.displayName = 'Question'
