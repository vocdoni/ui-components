import { Box, Flex, Text } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import { ChakraProps, chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { ElectionStatus } from '@vocdoni/sdk'
import { format } from 'date-fns'
import { useClient } from '../../client'
import { useElection } from './Election'

const percent = (result: number, total: number) => ((Number(result) / total) * 100 || 0).toFixed(0) + '%'

export const ElectionResults = (props: ChakraProps) => {
  const styles = useMultiStyleConfig('ElectionResults')
  const { election } = useElection()
  const { trans } = useClient()
  const totals = election?.questions.map((el) => el.choices.reduce((acc, curr) => acc + Number(curr.results), 0))

  if (election?.electionType.secretUntilTheEnd && election.status !== ElectionStatus.RESULTS) {
    return (
      <Text sx={styles.secret} {...props}>
        {trans('results.secret_until_the_end', { endDate: format(election.endDate, trans('results.date_format')) })}
      </Text>
    )
  }

  return (
    <Flex sx={styles.wrapper} {...props}>
      {election?.questions.map((q: any, idx: number) => (
        <chakra.div key={idx} sx={styles.question}>
          <chakra.div sx={styles.header}>
            <Text sx={styles.title}>{trans('results.title', { title: q.title.default })}</Text>
          </chakra.div>
          <chakra.div sx={styles.body}>
            {election?.questions[idx].choices.map((c: any, i: number) => (
              <Box key={i}>
                {totals && (
                  <>
                    <Text sx={styles.choiceTitle}>{c.title.default}</Text>
                    <Text sx={styles.choiceVotes}>
                      {trans('results.votes', { votes: c.results || 0, percent: percent(c.results, totals[idx]) })}
                    </Text>
                    <Progress sx={styles.progress} value={(Number(c.results) / totals[idx]) * 100 || 0} />
                  </>
                )}
              </Box>
            ))}
          </chakra.div>
        </chakra.div>
      ))}
    </Flex>
  )
}
