import { useElection } from '../../../providers'
import { IQuestion, PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useReactComponentsLocalize } from '../../../i18n/localize'
import { useComponents } from '../../context/useComponents'
import { ElectionQuestion } from './Fields'
import { QuestionsFormProvider, QuestionsFormProviderProps, useQuestionsForm } from './Form'
import { Voted } from './Voted'

export type ElectionQuestionsFormProps = ComponentPropsWithoutRef<'div'> & {
  onInvalid?: (errors: unknown) => void
}

export type ElectionQuestionsProps = ElectionQuestionsFormProps & QuestionsFormProviderProps

export const ElectionQuestions = (props: ElectionQuestionsProps) => (
  <QuestionsFormProvider>
    <ElectionQuestionsForm {...props} />
  </QuestionsFormProvider>
)

export const ElectionQuestionsForm = ({ onInvalid, ...rest }: ElectionQuestionsFormProps) => {
  const { election } = useElection()
  const { ElectionQuestions: Slot } = useComponents()

  if (!(election instanceof PublishedElection)) return null

  return <Slot {...rest} form={<QuestionsFormContents onInvalid={onInvalid} />} />
}

const QuestionsFormContents = ({ onInvalid }: { onInvalid?: (errors: unknown) => void }) => {
  const {
    election,
    voted,
    errors: { voting: error },
    isAbleToVote,
  } = useElection()
  const { QuestionsEmpty, QuestionsError } = useComponents()
  const t = useReactComponentsLocalize()
  const { fmethods, vote } = useQuestionsForm()
  const questions: IQuestion[] | undefined = (election as PublishedElection)?.questions

  if (voted && !isAbleToVote) {
    return <Voted />
  }

  if (!questions || !questions.length) {
    return <QuestionsEmpty text={t('empty')} />
  }

  return (
    <form onSubmit={fmethods.handleSubmit(vote, onInvalid)} id={`election-questions-${election!.id}`}>
      <Voted />
      {questions.map((question, index) => (
        <ElectionQuestion key={index} index={index.toString()} question={question} />
      ))}
      {error ? <QuestionsError error={error} variant='form' /> : null}
    </form>
  )
}
