import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import { FieldValues } from 'react-hook-form'
import { useComponents } from '~components/context/useComponents'
import { useConfirm } from '~confirm/useConfirm'
import { useReactComponentsLocalize } from '~i18n/localize'

export type QuestionsConfirmationProps = {
  answers: FieldValues
  election: PublishedElection
}

export const QuestionsConfirmation = ({ answers, election }: QuestionsConfirmationProps) => {
  const { QuestionsConfirmation: Slot } = useComponents()
  const { proceed, cancel } = useConfirm()
  const t = useReactComponentsLocalize()

  const answersView = election.questions.map((question, index) => {
    const indexedAnswer = answers[index.toString()]
    const isSingleChoice =
      election.resultsType.name === ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION ||
      typeof indexedAnswer === 'string'

    if (isSingleChoice) {
      const selected = parseInt((answers[index.toString()] as string) || '', 10)
      const selectedChoice = question.choices.find((choice) => choice.value === selected)
      return {
        question: question.title.default,
        answers: [selectedChoice?.title.default || ''],
      }
    }

    const rawSelectedValues = answers[0]
    const selectedValues = (Array.isArray(rawSelectedValues) ? rawSelectedValues : ['-1']).map((value) => Number(value))
    const mappedAnswers = selectedValues.map((value) => question.choices[value]?.title.default || t('vote.abstain'))
    return {
      question: question.title.default,
      answers: mappedAnswers,
    }
  })

  return (
    <Slot
      election={election}
      answers={answers}
      answersView={answersView}
      onConfirm={() => proceed?.()}
      onCancel={() => cancel?.()}
    />
  )
}
