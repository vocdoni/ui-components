import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Link, Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { ChakraProps, chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { ElectionStatus, IQuestion, InvalidElection } from '@vocdoni/sdk'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import reactStringReplace from 'react-string-replace'
import { useClient } from '../../client'
import { environment } from '../../environment'
import { Markdown } from '../layout'
import { useElection } from './Election'

export const ElectionQuestions = (props: ChakraProps) => {
  const { election, vote, voted, error, setFormError, localize, isAbleToVote } = useElection()
  const fmethods = useForm()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const questions = election?.questions

  if (election instanceof InvalidElection) return null

  if (voted && !isAbleToVote) {
    return <Voted />
  }

  if (!questions || (questions && !questions?.length)) {
    return (
      <Alert variant='subtle' status='warning' sx={styles.alert}>
        <AlertIcon />
        {localize('empty')}
      </Alert>
    )
  }

  return (
    <chakra.div __css={styles.wrapper} {...props}>
      <FormProvider {...fmethods}>
        <Voted />
        <form
          onSubmit={fmethods.handleSubmit(vote, (errs) => setFormError(Object.values(errs).length > 0))}
          id='election-questions-form'
        >
          {questions.map((question, qk) => (
            <QuestionField key={qk} index={qk.toString()} question={question} />
          ))}
          {error && (
            <Alert status='error' variant='solid' mb={3}>
              <AlertIcon />
              {error}
            </Alert>
          )}
        </form>
      </FormProvider>
    </chakra.div>
  )
}

const Voted = () => {
  const { env } = useClient()
  const { localize, voted } = useElection()
  const styles = useMultiStyleConfig('ElectionQuestions')

  if (!voted) {
    return null
  }

  return (
    <Alert
      variant='subtle'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      status='success'
      flexDir='column'
      isTruncated
      sx={styles.alert}
    >
      <AlertIcon />
      <AlertTitle sx={styles.alertTitle}>{localize('vote.voted_title')}</AlertTitle>
      <AlertDescription isTruncated maxW='100%' whiteSpace='initial' sx={styles.alertDescription}>
        {reactStringReplace(localize('vote.voted_description', { id: voted }), voted, (match, k) => (
          <Link key={k} href={environment.verifyVote(env, voted)} target='_blank' isTruncated sx={styles.alertLink}>
            {match}
          </Link>
        ))}
      </AlertDescription>
    </Alert>
  )
}

type QuestionFieldProps = ChakraProps & {
  index: string
  question: IQuestion
}

const QuestionField = ({ question, index }: QuestionFieldProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const { election, isAbleToVote, localize } = useElection()
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <chakra.div __css={styles.question}>
      <FormControl isInvalid={!!errors[index]}>
        <chakra.div __css={styles.header}>
          <chakra.label __css={styles.title}>{question.title.default}</chakra.label>
        </chakra.div>
        <chakra.div __css={styles.body}>
          {question.description && (
            <chakra.div __css={styles.description}>
              <Markdown>{question.description.default}</Markdown>
            </chakra.div>
          )}
          <Controller
            rules={{ required: localize('required') }}
            name={index}
            render={({ field }) => (
              <RadioGroup
                sx={styles.radioGroup}
                {...field}
                isDisabled={!isAbleToVote || election?.status !== ElectionStatus.ONGOING}
              >
                <Stack direction='column' sx={styles.stack}>
                  {question.choices.map((choice, ck) => (
                    <Radio key={ck} sx={styles.radio} value={choice.value.toString()}>
                      {choice.title.default}
                    </Radio>
                  ))}
                </Stack>
                <FormErrorMessage sx={styles.error}>{errors[index]?.message as string}</FormErrorMessage>
              </RadioGroup>
            )}
          />
        </chakra.div>
      </FormControl>
    </chakra.div>
  )
}

QuestionField.displayName = 'QuestionField'
