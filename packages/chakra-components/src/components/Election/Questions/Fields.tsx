import { Checkbox } from '@chakra-ui/checkbox'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Stack } from '@chakra-ui/layout'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, ElectionStatus, IQuestion, PublishedElection } from '@vocdoni/sdk'
import { Controller, useFormContext } from 'react-hook-form'
import { Markdown } from '../../layout'
import { QuestionTip } from './Tip'
import { QuestionsTypeBadge } from './TypeBadge'

export type QuestionProps = {
  index: string
  question: IQuestion
}

export type QuestionFieldProps = ChakraProps & QuestionProps

export const QuestionField = ({ question, index }: QuestionFieldProps) => {
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

export const FieldSwitcher = (props: QuestionProps) => {
  const { election } = useElection()

  if (!(election instanceof PublishedElection)) return null

  switch (election?.resultsType.name) {
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      return <MultiChoice {...props} />
    case ElectionResultsTypeNames.APPROVAL:
      return <ApprovalChoice {...props} />
    case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
    default:
      return <SingleChoice {...props} />
  }
}

export const MultiChoice = ({ index, question }: QuestionProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const {
    election,
    isAbleToVote,
    loading: { voting },
    localize,
  } = useElection()
  const { control, trigger, watch, getValues } = useFormContext()
  const values = watch(index) || []

  if (!(election instanceof PublishedElection)) return null

  const isNotAbleToVote = election?.status !== ElectionStatus.ONGOING || !isAbleToVote || voting

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

export const ApprovalChoice = ({ index, question }: QuestionProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const {
    election,
    isAbleToVote,
    loading: { voting },
    localize,
  } = useElection()
  const { control, watch } = useFormContext()
  const values = watch(index) || []

  if (!(election instanceof PublishedElection)) return null

  const isNotAbleToVote = election?.status !== ElectionStatus.ONGOING || !isAbleToVote || voting

  if (!(election && election.resultsType.name === ElectionResultsTypeNames.APPROVAL)) {
    return null
  }

  const choices = [...question.choices]

  return (
    <Stack sx={styles.stack}>
      <Controller
        control={control}
        disabled={isNotAbleToVote}
        rules={{
          validate: (v) => {
            return (v && v.length > 0) || localize('validation.at_least_one')
          },
        }}
        name={index}
        render={({ field: { ref, onChange, ...restField }, fieldState: { error: fieldError } }) => {
          return (
            <>
              {choices.map((choice, ck) => {
                return (
                  <Checkbox
                    {...restField}
                    key={ck}
                    sx={styles.checkbox}
                    value={choice.value.toString()}
                    isDisabled={isNotAbleToVote}
                    onChange={(e) => {
                      if (values.includes(e.target.value)) {
                        onChange(values.filter((v: string) => v !== e.target.value))
                      } else {
                        onChange([...values, e.target.value])
                      }
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

export const SingleChoice = ({ index, question }: QuestionProps) => {
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

  if (!(election instanceof PublishedElection)) return null

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
