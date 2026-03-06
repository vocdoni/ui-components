import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useReactComponentsLocalize } from '../../../i18n/localize'
import { useComponents } from '../../context/useComponents'

export const QuestionsTypeBadge = (props: ComponentPropsWithoutRef<'div'> & Record<string, unknown>) => {
  const { election } = useElection()
  const { QuestionsTypeBadge: Slot } = useComponents()
  const t = useReactComponentsLocalize()

  if (!election || !(election instanceof PublishedElection) || !election.census) {
    return null
  }

  const weighted = Number(election.census.weight) !== election.census.size ? t('question_types.weighted_voting') : ''

  let title = ''
  let tooltip = ''

  switch (election.resultsType.name) {
    case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
      title = t('question_types.singlechoice_title', { weighted })
      break
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      title = t('question_types.multichoice_title', { weighted })
      tooltip = t('question_types.multichoice_tooltip', { maxcount: election.voteType.maxCount })
      break
    case ElectionResultsTypeNames.APPROVAL:
      title = t('question_types.approval_title')
      tooltip = t('question_types.approval_tooltip', { maxcount: election.voteType.maxCount })
      break
    default:
      return null
  }

  return <Slot {...props} title={title} tooltip={tooltip} />
}
