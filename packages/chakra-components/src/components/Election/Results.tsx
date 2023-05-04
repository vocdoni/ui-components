import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Card, CardBody, CardHeader } from '@chakra-ui/card'
import { Progress } from '@chakra-ui/progress'
import { useClient } from '../../client'

import { useElection } from './Election'

export const ElectionResults = (props: ChakraProps) => {
  const styles = useMultiStyleConfig('Results')
  const { election } = useElection()
  const { trans } = useClient()
  const totals = election?.questions.map((el) => el.choices.reduce((acc, curr) => acc + Number(curr.results), 0))

  return (
    <chakra.div __css={styles.results} {...props}>
      {election?.electionType.secretUntilTheEnd ? (
        <Text sx={styles.textSecretElection}>{trans('results.secret_until_the_end')}</Text>
      ) : (
        <Flex sx={styles.resultsFlex}>
          {election?.questions.map((q: any, idx: number) => (
            <Card variant='results' key={idx}>
              <CardHeader>
                <Text sx={styles.title}>
                  {trans('results.results_from')} {q.title.default}
                </Text>
              </CardHeader>
              <CardBody sx={styles.choiceResultCard}>
                {election?.questions[idx].choices.map((c: any, i: number) => (
                  <Box key={i}>
                    {totals && (
                      <>
                        <Text id='choiceTitleText'>{c.title.default}</Text>
                        <Text id='choiceResultText'>
                          {trans('results.votes')}: {c.results || 0} (
                          {((Number(c.results) / totals[idx]) * 100 || 0).toFixed(0)}
                          %)
                        </Text>
                        <Progress sx={styles.resultsProgress} value={(Number(c.results) / totals[idx]) * 100 || 0} />
                      </>
                    )}
                  </Box>
                ))}
              </CardBody>
            </Card>
          ))}
        </Flex>
      )}
    </chakra.div>
  )
}
