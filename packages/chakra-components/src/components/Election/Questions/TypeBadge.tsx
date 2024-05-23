import { Tooltip } from '@chakra-ui/react'
import { chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'

export const QuestionsTypeBadge = () => {
  const styles = useMultiStyleConfig('QuestionsTypeBadge')
  const { election, localize } = useElection()

  if (!election || !(election instanceof PublishedElection) || !election.census) {
    return null
  }

  const weighted =
    Number(election.census.weight) !== election.census.size ? localize('question_types.weighted_voting') : ''
  let title: string = ''
  let tooltip: string = ''
  switch (election?.resultsType.name) {
    case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
      title = localize('question_types.singlechoice_title', { weighted })
      break
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      title = localize('question_types.multichoice_title', { weighted })
      tooltip = localize('question_types.multichoice_tooltip', { maxcount: election.voteType.maxCount })
      break
    case ElectionResultsTypeNames.APPROVAL:
      title = localize('question_types.approval_title')
      tooltip = localize('question_types.approval_tooltip', { maxcount: election.voteType.maxCount })
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
