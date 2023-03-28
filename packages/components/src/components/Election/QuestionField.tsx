import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { IQuestion } from '@vocdoni/sdk'
import { Controller, useFormContext } from 'react-hook-form'
import { Markdown } from '../layout'
import { useElection } from './Election'

type QuestionFieldProps = ChakraProps & {
  question: IQuestion
}

export const QuestionField = ({ question, ...rest }: QuestionFieldProps) => {
  const styles = useMultiStyleConfig('Questions')
  const { isAbleToVote } = useElection()
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <chakra.div __css={styles.question} {...rest}>
      <FormControl isInvalid={!!errors[question.title.default]}>
        <chakra.label __css={styles.title}>{question.title.default}</chakra.label>
        {question.description && (
          <chakra.div __css={styles.description}>
            <Markdown>{question.description.default}</Markdown>
          </chakra.div>
        )}
        <Controller
          rules={{ required: 'This field is required' }}
          name={question.title.default}
          render={({ field }) => (
            <RadioGroup sx={styles.radioGroup} {...field} isDisabled={!isAbleToVote}>
              <Stack direction='column' sx={styles.stack}>
                {question.choices.map((choice, ck) => (
                  <Radio key={ck} sx={styles.radio} value={choice.title.default}>
                    {choice.title.default}
                  </Radio>
                ))}
              </Stack>
              <FormErrorMessage sx={styles.error}>{errors[question.title.default]?.message as string}</FormErrorMessage>
            </RadioGroup>
          )}
        />
      </FormControl>
    </chakra.div>
  )
}

QuestionField.displayName = 'Question'
