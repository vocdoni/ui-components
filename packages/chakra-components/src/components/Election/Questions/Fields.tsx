import { Checkbox } from '@chakra-ui/checkbox'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { Stack, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { Skeleton } from '@chakra-ui/skeleton'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, ElectionStatus, IChoice, IQuestion, PublishedElection } from '@vocdoni/sdk'
import { Controller, useFormContext } from 'react-hook-form'
import { Image, Markdown } from '../../layout'
import { QuestionTip } from './Tip'
import { useState } from 'react'

export type QuestionProps = {
  index: string
  question: IQuestion
  isDisabled?: boolean
}

export type QuestionFieldProps = ChakraProps & QuestionProps

export const QuestionField = ({ question, index, isDisabled }: QuestionFieldProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const {
    formState: { errors },
  } = useFormContext()

  const [election, qi] = index.split('.')
  const questionIndex = Number(qi)
  let isInvalid = false
  if (errors[election] && Array.isArray(errors[election]) && errors[election][questionIndex]) {
    isInvalid = !!errors[election][questionIndex]
  }
  return (
    <chakra.div __css={styles.question}>
      <FormControl isInvalid={isInvalid}>
        <chakra.div __css={styles.header}>
          <chakra.label __css={styles.title}>{question.title.default}</chakra.label>
        </chakra.div>
        <chakra.div __css={styles.body}>
          {question.description && (
            <chakra.div __css={styles.description}>
              <Markdown>{question.description.default}</Markdown>
            </chakra.div>
          )}
          <FieldSwitcher index={index} question={question} isDisabled={isDisabled} />
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

export const MultiChoice = ({ index, question, isDisabled }: QuestionProps) => {
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

  const disabled = election?.status !== ElectionStatus.ONGOING || !isAbleToVote || voting || isDisabled

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
        disabled={disabled}
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
                    isDisabled={disabled || maxSelected}
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
                    <QuestionChoice {...choice} />
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

export const ApprovalChoice = ({ index, question, isDisabled }: QuestionProps) => {
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

  const disabled = election?.status !== ElectionStatus.ONGOING || !isAbleToVote || voting || isDisabled

  if (!(election && election.resultsType.name === ElectionResultsTypeNames.APPROVAL)) {
    return null
  }

  const choices = [...question.choices]

  return (
    <Stack sx={styles.stack}>
      <Controller
        control={control}
        disabled={disabled}
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
                    isDisabled={disabled}
                    onChange={(e) => {
                      if (values.includes(e.target.value)) {
                        onChange(values.filter((v: string) => v !== e.target.value))
                      } else {
                        onChange([...values, e.target.value])
                      }
                    }}
                  >
                    <QuestionChoice {...choice} />
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

export const SingleChoice = ({ index, question, isDisabled }: QuestionProps) => {
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

  const disabled = election?.status !== ElectionStatus.ONGOING || !isAbleToVote || voting || isDisabled

  return (
    <Controller
      control={control}
      disabled={disabled}
      rules={{
        required: localize('validation.required'),
      }}
      name={index}
      render={({ field, fieldState: { error: fieldError } }) => (
        <RadioGroup sx={styles.radioGroup} {...field} isDisabled={disabled}>
          <Stack direction='column' sx={styles.stack}>
            {question.choices.map((choice, ck) => {
              return (
                <Radio key={ck} sx={styles.radio} value={choice.value.toString()}>
                  <QuestionChoice {...choice} />
                </Radio>
              )
            })}
          </Stack>
          <FormErrorMessage sx={styles.error}>{fieldError?.message as string}</FormErrorMessage>
        </RadioGroup>
      )}
    />
  )
}

export type QuestionChoiceMeta = {
  image: {
    default: string
    thumbnail?: string
  }
  description?: {
    default: string
    [lang: string]: string
  }
}

export const QuestionChoice = (choice: IChoice & ChakraProps) => {
  const styles = useMultiStyleConfig('QuestionsChoice')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loaded, setLoaded] = useState(false)
  const [loadedModal, setLoadedModal] = useState(false)

  const label = choice.title.default
  const { image, description } = (choice?.meta ?? {}) as QuestionChoiceMeta
  const defaultImage = image?.default ?? ''
  const thumbnail = image?.thumbnail
  const descriptionTxt = description?.default ?? ''

  const renderModal = defaultImage || descriptionTxt || thumbnail

  return (
    <Stack sx={styles.choiceWrapper}>
      {(defaultImage || thumbnail) && (
        <Skeleton isLoaded={loaded} sx={styles.skeleton}>
          <Image
            onClick={(e) => {
              if (!renderModal) return
              e.preventDefault()
              onOpen()
            }}
            sx={styles.choiceImage}
            src={thumbnail ?? defaultImage}
            alt={label}
            onLoad={() => setLoaded(true)}
          />
        </Skeleton>
      )}
      <Text sx={styles.choiceLabel}>{label}</Text>
      {renderModal && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay sx={styles.modalOverlay} />
          <ModalContent sx={styles.modalContent}>
            <ModalCloseButton sx={styles.modalClose} />
            <ModalBody sx={styles.modalBody}>
              {defaultImage && (
                <Skeleton isLoaded={loadedModal} sx={styles.skeletonModal}>
                  <Image src={defaultImage} alt={label} sx={styles.modalImage} onLoad={() => setLoadedModal(true)} />
                </Skeleton>
              )}
              <Text sx={styles.modalLabel}>{label}</Text>
              {descriptionTxt && <Text sx={styles.modalDescription}>{descriptionTxt}</Text>}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Stack>
  )
}
