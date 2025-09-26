import { chakra, useMultiStyleConfig } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import { useQuestionsForm } from './Form'

export const QuestionTip = () => {
  const styles = useMultiStyleConfig('QuestionsTip')
  const {
    fmethods: { getValues },
  } = useQuestionsForm()
  const { election, localize } = useElection()

  if (!election || !(election instanceof PublishedElection)) return null

  let txt: string = ''
  switch (election?.resultsType.name) {
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      txt = localize('question_types.multichoice_desc', {
        selected: getValues()[0]?.length,
        maxcount: election.voteType.maxCount,
      })
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
