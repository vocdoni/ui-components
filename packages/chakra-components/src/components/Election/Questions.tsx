import { Alert, AlertIcon } from '@chakra-ui/alert'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { IQuestion } from '@vocdoni/sdk'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { Markdown } from '../layout'
import { useElection } from './Election'

export const ElectionQuestions = () => {
  const { election, signer, vote, voted, ConnectButton, error, loading, trans, isAbleToVote } = useElection()
  const fmethods = useForm()
  const styles = useMultiStyleConfig('Questions')
  const questions = election?.questions

  if (voted && !isAbleToVote) {
    return <Voted />
  }

  if (!questions || (questions && !questions?.length)) {
    return (
      <Alert variant='solid' status='warning' sx={styles.alert}>
        <AlertIcon />
        {trans('empty')}
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

  return (
    <FormProvider {...fmethods}>
      <Voted />
      <form onSubmit={fmethods.handleSubmit(vote)} id='election-questions-form'>
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

const Voted = () => {
  const { trans, voted } = useElection()

  if (!voted) {
    return null
  }

  return (
    <Alert variant='solid' status='info'>
      <AlertIcon />
      {trans('voted', { id: voted })}
    </Alert>
  )
}

type QuestionFieldProps = ChakraProps & {
  question: IQuestion
}

const QuestionField = ({ question, ...rest }: QuestionFieldProps) => {
  const styles = useMultiStyleConfig('Questions')
  const { isAbleToVote, trans } = useElection()
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
          rules={{ required: trans('required') }}
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

QuestionField.displayName = 'QuestionField'
