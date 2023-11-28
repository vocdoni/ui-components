import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Box, Link, Stack, Text } from '@chakra-ui/layout'
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/modal'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { chakra, ChakraProps, omitThemingProps, useMultiStyleConfig } from '@chakra-ui/system'
import { Wallet } from '@ethersproject/wallet'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, InvalidElection, IQuestion } from '@vocdoni/sdk'
import { ReactNode } from 'react'
import { Controller, FieldValues, FormProvider, SubmitErrorHandler, useForm, useFormContext } from 'react-hook-form'
import reactStringReplace from 'react-string-replace'
import { environment } from '../../environment'
import { Markdown, useConfirm } from '../layout'

type ElectionQuestionsProps = ChakraProps & {
  confirmContents?: (questions: IQuestion[], answers: FieldValues) => ReactNode
  onInvalid?: SubmitErrorHandler<FieldValues>
}

export const ElectionQuestions = (props: ElectionQuestionsProps) => {
  const {
    election,
    vote: bvote,
    voted,
    errors: { voting: error },
    localize,
    isAbleToVote,
    client,
  } = useElection()
  const fmethods = useForm()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const questions = election?.questions
  const { confirm } = useConfirm()
  const { confirmContents, onInvalid, ...rest } = props

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

  const vote = async (values: FieldValues) => {
    if (
      client.wallet instanceof Wallet &&
      !(await confirm(
        typeof confirmContents === 'function' ? (
          confirmContents(questions, values)
        ) : (
          <QuestionsConfirmation questions={questions} answers={values} />
        )
      ))
    ) {
      return false
    }

    return bvote(election.questions.map((q, k) => parseInt(values[k.toString()], 10)))
  }

  return (
    <chakra.div __css={styles.wrapper} {...rest}>
      <FormProvider {...fmethods}>
        <Voted />
        <form onSubmit={fmethods.handleSubmit(vote, onInvalid)} id={`election-questions-${election.id}`}>
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

export type QuestionsConfirmationProps = {
  answers: FieldValues
  questions: IQuestion[]
}

export const QuestionsConfirmation = ({ answers, questions, ...rest }: QuestionsConfirmationProps) => {
  const mstyles = useMultiStyleConfig('ConfirmModal')
  const styles = useMultiStyleConfig('QuestionsConfirmation', rest)
  const { cancel, proceed } = useConfirm()
  const props = omitThemingProps(rest)
  const { localize } = useClient()

  return (
    <>
      <ModalHeader sx={mstyles.header}>{localize('confirm.title')}</ModalHeader>
      <ModalCloseButton sx={mstyles.close} />
      <ModalBody sx={mstyles.body}>
        <Box {...props} sx={styles.box}>
          <Text sx={styles.description}>{localize('vote.confirm')}</Text>
          {questions.map((q, k) => {
            const choice = q.choices.find((v) => v.value === parseInt(answers[k.toString()], 10))
            return (
              <chakra.div key={k} __css={styles.question}>
                <chakra.div __css={styles.title}>{q.title.default}</chakra.div>
                <chakra.div __css={styles.answer}>{choice?.title.default}</chakra.div>
              </chakra.div>
            )
          })}
        </Box>
      </ModalBody>
      <ModalFooter sx={mstyles.footer}>
        <Button onClick={cancel!} variant='ghost' sx={mstyles.cancel}>
          {localize('confirm.cancel')}
        </Button>
        <Button onClick={proceed!} sx={mstyles.confirm}>
          {localize('confirm.confirm')}
        </Button>
      </ModalFooter>
    </>
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
            rules={{ required: localize('validation.required') }}
            name={index}
            render={({ field }) => (
              <RadioGroup
                sx={styles.radioGroup}
                {...field}
                isDisabled={election?.status !== ElectionStatus.ONGOING || !isAbleToVote}
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
