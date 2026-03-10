import { useElection } from '../../../providers'
import { ElectionResultsTypeNames, ElectionStatus, IChoice, IQuestion, PublishedElection } from '@vocdoni/sdk'
import { Controller, useFormContext } from 'react-hook-form'
import { useReactComponentsLocalize } from '../../../i18n/localize'
import { QuestionChoicePresentation, QuestionLayout, QuestionSelectionMode } from '../../context/types'
import { useComponents } from '../../context/useComponents'
import { hasExtendedChoiceMeta, QuestionChoice } from './Choice'
import { QuestionTip } from './Tip'

export type QuestionProps = {
  question: IQuestion
  index: string
}

const getSelectionMode = (resultsType: string): QuestionSelectionMode =>
  resultsType === ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION ? 'single' : 'multiple'

const getQuestionPresentation = (question: IQuestion): QuestionChoicePresentation =>
  question.choices.some(hasExtendedChoiceMeta) ? 'extended' : 'basic'

const getQuestionLayout = (question: IQuestion): QuestionLayout =>
  question.choices.some((choice) => Boolean(choice.meta?.image?.default)) ? 'grid' : 'list'

export const ElectionQuestion = ({ question, index }: QuestionProps) => {
  const { election } = useElection()
  const { ElectionQuestion: Slot } = useComponents()
  const {
    formState: { errors },
  } = useFormContext()
  const layout = getQuestionLayout(question)
  const hasExtendedChoices = question.choices.some(hasExtendedChoiceMeta)
  const selectionMode =
    election instanceof PublishedElection ? getSelectionMode(election.resultsType.name) : ('single' as const)
  const invalid = Boolean((errors as Record<string, unknown>)[index])

  return (
    <Slot
      question={question}
      index={index}
      layout={layout}
      invalid={invalid}
      hasExtendedChoices={hasExtendedChoices}
      selectionMode={selectionMode}
      title={question.title.default}
      description={question.description?.default}
      fields={
        <FieldSwitcher
          question={question}
          index={index}
          layout={layout}
          presentation={getQuestionPresentation(question)}
        />
      }
      tip={<QuestionTip />}
    />
  )
}

const FieldSwitcher = (props: QuestionProps & { layout: QuestionLayout; presentation: QuestionChoicePresentation }) => {
  const { election } = useElection()
  if (!(election instanceof PublishedElection)) return null

  switch (election.resultsType.name) {
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      return <MultiChoice {...props} />
    case ElectionResultsTypeNames.APPROVAL:
      return <ApprovalChoice {...props} />
    case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
    default:
      return <SingleChoice {...props} />
  }
}

const MultiChoice = ({
  index,
  question,
  layout,
  presentation,
}: QuestionProps & { layout: QuestionLayout; presentation: QuestionChoicePresentation }) => {
  const {
    election,
    isAbleToVote,
    loading: { voting },
  } = useElection()
  const t = useReactComponentsLocalize()
  const { control, trigger } = useFormContext()
  const { QuestionsError } = useComponents()

  if (
    !(election instanceof PublishedElection) ||
    election.resultsType.name !== ElectionResultsTypeNames.MULTIPLE_CHOICE
  )
    return null

  const disabled = election.status !== ElectionStatus.ONGOING || !isAbleToVote || voting
  const choices = [...question.choices]
  const canAbstain = election.resultsType.properties.canAbstain
  const shouldRenderAbstain = canAbstain && !election.get('questions.hideAbstain')

  if (canAbstain && shouldRenderAbstain) {
    choices.push({ title: { default: t('vote.abstain') }, value: -1 } as IChoice)
  }

  return (
    <Controller
      control={control}
      disabled={disabled}
      name={index}
      rules={{
        validate: (value: string[]) => {
          if (!shouldRenderAbstain || (value && value.includes('-1') && value.length < election.voteType.maxCount)) {
            return true
          }
          return (
            (value && value.length === election.voteType.maxCount) ||
            t('validation.choices_count', { count: election.voteType.maxCount })
          )
        },
      }}
      render={({ field, fieldState }) => {
        const currentValues: string[] = Array.isArray(field.value) ? field.value : []

        return (
          <>
            {choices.map((choice) => {
              const value = choice.value.toString()
              const maxSelected = currentValues.length >= election.voteType.maxCount && !currentValues.includes(value)

              return (
                <QuestionChoice
                  key={value}
                  choice={choice}
                  value={value}
                  controlType='checkbox'
                  selectionMode='multiple'
                  presentation={presentation}
                  compact={!Boolean(choice.meta?.image?.default) && layout === 'list'}
                  dataAttrs={{
                    'data-choice-card': '',
                    'data-choice-control': '',
                    'data-choice-body': '',
                    'data-choice-media': '',
                    'data-layout': layout,
                  }}
                  selected={currentValues.includes(value)}
                  disabled={disabled || maxSelected}
                  onSelect={(checked) => {
                    if (checked && maxSelected) return

                    const next = checked
                      ? [...currentValues, value]
                      : currentValues.filter((currentValue) => currentValue !== value)

                    field.onChange(next)
                    trigger(index)
                  }}
                />
              )
            })}
            {fieldState.error?.message ? <QuestionsError error={fieldState.error.message} variant='field' /> : null}
          </>
        )
      }}
    />
  )
}

const ApprovalChoice = ({
  index,
  question,
  layout,
  presentation,
}: QuestionProps & { layout: QuestionLayout; presentation: QuestionChoicePresentation }) => {
  const {
    election,
    isAbleToVote,
    loading: { voting },
  } = useElection()
  const { control } = useFormContext()
  const { QuestionsError } = useComponents()
  const t = useReactComponentsLocalize()

  if (!(election instanceof PublishedElection) || election.resultsType.name !== ElectionResultsTypeNames.APPROVAL)
    return null

  const disabled = election.status !== ElectionStatus.ONGOING || !isAbleToVote || voting
  return (
    <Controller
      control={control}
      disabled={disabled}
      name={index}
      rules={{
        validate: (value: string[]) =>
          (value && value.length > 0) || t('validation.at_least_one', { defaultValue: 'Select at least one option' }),
      }}
      render={({ field, fieldState }) => {
        const currentValues: string[] = Array.isArray(field.value) ? field.value : []
        return (
          <>
            {question.choices.map((choice) => {
              const value = choice.value.toString()
              return (
                <QuestionChoice
                  key={value}
                  choice={choice}
                  value={value}
                  controlType='checkbox'
                  selectionMode='multiple'
                  presentation={presentation}
                  compact={!Boolean(choice.meta?.image?.default) && layout === 'list'}
                  dataAttrs={{
                    'data-choice-card': '',
                    'data-choice-control': '',
                    'data-choice-body': '',
                    'data-choice-media': '',
                    'data-layout': layout,
                  }}
                  selected={currentValues.includes(value)}
                  disabled={disabled}
                  onSelect={(checked) => {
                    const next = checked
                      ? [...currentValues, value]
                      : currentValues.filter((currentValue) => currentValue !== value)

                    field.onChange(next)
                  }}
                />
              )
            })}
            {fieldState.error?.message ? <QuestionsError error={fieldState.error.message} variant='field' /> : null}
          </>
        )
      }}
    />
  )
}

const SingleChoice = ({
  index,
  question,
  layout,
  presentation,
}: QuestionProps & { layout: QuestionLayout; presentation: QuestionChoicePresentation }) => {
  const {
    election,
    isAbleToVote,
    loading: { voting },
  } = useElection()
  const { control } = useFormContext()
  const { QuestionsError } = useComponents()
  const t = useReactComponentsLocalize()

  if (!(election instanceof PublishedElection)) return null

  const disabled = election.status !== ElectionStatus.ONGOING || !isAbleToVote || voting

  return (
    <Controller
      control={control}
      disabled={disabled}
      name={index}
      rules={{ required: t('validation.required') }}
      render={({ field, fieldState }) => (
        <>
          {question.choices.map((choice) => (
            <QuestionChoice
              key={choice.value}
              choice={choice}
              value={choice.value.toString()}
              controlType='radio'
              selectionMode='single'
              presentation={presentation}
              compact={!Boolean(choice.meta?.image?.default) && layout === 'list'}
              dataAttrs={{
                'data-choice-card': '',
                'data-choice-control': '',
                'data-choice-body': '',
                'data-choice-media': '',
                'data-layout': layout,
              }}
              selected={field.value === choice.value.toString()}
              disabled={disabled}
              onSelect={(checked) => {
                if (!checked) return
                field.onChange(choice.value.toString())
              }}
            />
          ))}
          {fieldState.error?.message ? <QuestionsError error={fieldState.error.message} variant='field' /> : null}
        </>
      )}
    />
  )
}
