import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import { useComponents } from '~components/context/useComponents'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useElection } from '~providers'
import { useQuestionsForm } from './Form'

export const QuestionTip = () => {
  const { QuestionTip: Slot } = useComponents()
  const {
    fmethods: { getValues },
  } = useQuestionsForm()
  const { election } = useElection()
  const t = useReactComponentsLocalize()

  if (!election || !(election instanceof PublishedElection)) return null

  let text = ''
  if (election.resultsType.name === ElectionResultsTypeNames.MULTIPLE_CHOICE) {
    text = t('question_types.multichoice_desc', {
      selected: getValues()[0]?.length,
      maxcount: election.voteType.maxCount,
    })
    if (election.resultsType.properties.canAbstain) {
      text += t('question_types.multichoice_desc_abstain')
    }
  }

  if (!text) return null

  return <Slot text={text} />
}
