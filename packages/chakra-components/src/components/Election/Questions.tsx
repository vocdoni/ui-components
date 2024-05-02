import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import { Button } from '@chakra-ui/button'
import { Checkbox } from '@chakra-ui/checkbox'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Box, Link, Stack, Text } from '@chakra-ui/layout'
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/modal'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { chakra, ChakraProps, omitThemingProps, useMultiStyleConfig } from '@chakra-ui/system'
import { Wallet } from '@ethersproject/wallet'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, ElectionStatus, InvalidElection, IQuestion, PublishedElection } from '@vocdoni/sdk'
import { ReactNode, useEffect } from 'react'
import { Controller, FieldValues, FormProvider, SubmitErrorHandler, useForm, useFormContext } from 'react-hook-form'
import reactStringReplace from 'react-string-replace'
import { environment } from '../../environment'
import { Markdown, useConfirm } from '../layout'
import { Tooltip } from '@chakra-ui/react'

type ElectionQuestionsProps = ChakraProps & {
  confirmContents?: (election: PublishedElection, answers: FieldValues) => ReactNode
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
  const { account } = useClient()
  const fmethods = useForm()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const questions = election?.questions
  const { confirm } = useConfirm()
  const { confirmContents, onInvalid, ...rest } = props

  // reset form if account gets disconnected
  useEffect(() => {
    if (typeof client.wallet !== 'undefined' || !questions) return

    fmethods.reset({
      ...questions.reduce((acc, question, index) => ({ ...acc, [index]: '' }), {}),
    })
  }, [client])

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
          confirmContents(election, values)
        ) : (
          <QuestionsConfirmation election={election} answers={values} />
        )
      ))
    ) {
      return false
    }

    let results: number[] = []
    switch (election.resultsType.name) {
      case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
        results = election.questions.map((q, k) => parseInt(values[k.toString()], 10))
        break
      case ElectionResultsTypeNames.MULTIPLE_CHOICE:
        results = Object.values(values)
          .pop()
          .map((v: string) => parseInt(v, 10))
        // map proper abstain ids
        if (election.resultsType.properties.canAbstain && results.length < election.voteType.maxCount!) {
          let abs = 0
          while (results.length < (election.voteType.maxCount || 1)) {
            results.push(parseInt(election.resultsType.properties.abstainValues[abs++], 10))
          }
        }
        break
      default:
        throw new Error('Unknown or invalid election type')
    }

    return bvote(results)
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
  election: PublishedElection
}

export const QuestionsConfirmation = ({ answers, election, ...rest }: QuestionsConfirmationProps) => {
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
          {election.questions.map((q, k) => {
            if (election.resultsType.name === ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION) {
              const choice = q.choices.find((v) => v.value === parseInt(answers[k.toString()], 10))
              return (
                <chakra.div key={k} __css={styles.question}>
                  <chakra.div __css={styles.title}>{q.title.default}</chakra.div>
                  <chakra.div __css={styles.answer}>{choice?.title.default}</chakra.div>
                </chakra.div>
              )
            }
            const choices = answers[0]
              .map((a: string) =>
                q.choices[Number(a)] ? q.choices[Number(a)].title.default : localize('vote.abstain')
              )
              .map((a: string) => (
                <span>
                  - {a}
                  <br />
                </span>
              ))

            return (
              <chakra.div key={k} __css={styles.question}>
                <chakra.div __css={styles.title}>{q.title.default}</chakra.div>
                <chakra.div __css={styles.answer}>{choices}</chakra.div>
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

type QuestionProps = {
  index: string
  question: IQuestion
}

type QuestionFieldProps = ChakraProps & QuestionProps

const QuestionField = ({ question, index }: QuestionFieldProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <chakra.div __css={styles.question}>
      <chakra.div __css={styles.typeBadgeWrapper}>
        <QuestionsTypeBadge />
      </chakra.div>
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
          <FieldSwitcher index={index} question={question} />
          <QuestionTip />
        </chakra.div>
      </FormControl>
    </chakra.div>
  )
}

const FieldSwitcher = (props: QuestionProps) => {
  const { election } = useElection()

  switch (election?.resultsType.name) {
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      return <MultiChoice {...props} />
    case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
    default:
      return <SingleChoice {...props} />
  }
}

const MultiChoice = ({ index, question }: QuestionProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const {
    election,
    isAbleToVote,
    loading: { voting },
    localize,
  } = useElection()
  const { control, trigger, watch, getValues } = useFormContext()
  const isNotAbleToVote = election?.status !== ElectionStatus.ONGOING || !isAbleToVote || voting
  const values = watch(index) || []

  if (!(election && election.resultsType.name === ElectionResultsTypeNames.MULTIPLE_CHOICE)) {
    return null
  }

  const choices = [...question.choices]
  // Put can abstain on a separated variable to avoid typing errors on validation function
  const canAbstain = election.resultsType.properties.canAbstain

  return (
    <Stack sx={styles.stack}>
      <Controller
        control={control}
        disabled={isNotAbleToVote}
        rules={{
          validate: (v) => {
            // allow a single selection if is an abstain
            if (canAbstain && v && v.length < election.voteType.maxCount!) return true

            return (
              (v && v.length === election.voteType.maxCount) ||
              localize('validation.choices_count', { count: election.voteType.maxCount })
            )
          },
        }}
        name={index}
        render={({ field: { ref, onChange, ...restField }, fieldState: { error: fieldError } }) => {
          // Determine if the checkbox should be disabled because maximum number of choices has been reached
          const currentValues = getValues(index) || []

          return (
            <>
              {choices.map((choice, ck) => {
                const maxSelected =
                  currentValues.length >= election.voteType.maxCount! &&
                  !currentValues.includes(choice.value.toString())
                return (
                  <Checkbox
                    {...restField}
                    key={ck}
                    sx={styles.checkbox}
                    value={choice.value.toString()}
                    isDisabled={isNotAbleToVote || maxSelected}
                    isChecked={currentValues.includes(choice.value.toString())}
                    onChange={(e) => {
                      if (values.includes(e.target.value)) {
                        onChange(values.filter((v: string) => v !== e.target.value))
                      } else {
                        if (maxSelected) return
                        onChange([...values, e.target.value])
                      }
                      trigger(index) // Manually trigger validation
                    }}
                  >
                    {choice.title.default}
                  </Checkbox>
                )
              })}
              <FormErrorMessage sx={styles.error}>{fieldError?.message as string}</FormErrorMessage>
            </>
          )
        }}
      />
    </Stack>
  )
}

const SingleChoice = ({ index, question }: QuestionProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const {
    election,
    isAbleToVote,
    loading: { voting },
    localize,
  } = useElection()
  const {
    formState: { errors },
    control,
  } = useFormContext()
  const disabled = election?.status !== ElectionStatus.ONGOING || !isAbleToVote || voting
  return (
    <Controller
      control={control}
      disabled={disabled}
      rules={{
        required: localize('validation.required'),
      }}
      name={index}
      render={({ field }) => (
        <RadioGroup sx={styles.radioGroup} {...field} isDisabled={disabled}>
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
  )
}

const QuestionsTypeBadge = () => {
  const styles = useMultiStyleConfig('QuestionsTypeBadge')
  const { election, localize } = useElection()

  let title: string = ''
  let tooltip: string = ''
  switch (election?.resultsType.name) {
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      title = localize('question_types.multichoice_title')
      tooltip = localize('question_types.multichoice_tooltip', { maxcount: election.voteType.maxCount })
      break
    default:
      return null
  }

  return (
    <chakra.div __css={styles.box}>
      <Tooltip label={tooltip} hasArrow sx={styles.tooltip} placement='auto'>
        <chakra.label __css={styles.title}>{title}</chakra.label>
      </Tooltip>
    </chakra.div>
  )
}

const QuestionTip = () => {
  const styles = useMultiStyleConfig('QuestionsTip')
  const { election, localize } = useElection()

  let txt: string = ''
  switch (election?.resultsType.name) {
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      txt = localize('question_types.multichoice_desc', { maxcount: election.voteType.maxCount })
      if (election.resultsType.properties.canAbstain) {
        txt += localize('question_types.multichoice_desc_abstain')
      }
      break
    default:
      return null
  }

  return (
    <chakra.div __css={styles.wrapper}>
      <chakra.div __css={styles.text}>{txt}</chakra.div>
    </chakra.div>
  )
}
