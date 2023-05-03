import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Card, CardBody, CardHeader } from '@chakra-ui/card'

import { useElection } from './Election'

export const ElectionResults = (props: ChakraProps) => {
  const styles = useMultiStyleConfig('Results')
  const { election } = useElection()
  const totals = election?.questions.map((el) => el.choices.reduce((acc, curr) => acc + Number(curr.results), 0))

  return (
    <chakra.div __css={styles.results} {...props}>
      {election?.electionType.secretUntilTheEnd ? (
        <Text color='process.secret_until_the_end' textAlign='center' fontWeight='bold'>
          Secret until the end
        </Text>
      ) : (
        <Flex sx={styles.resultsFlex}>
          {election?.questions.map((q: any, idx: number) => (
            <Card variant='results' key={idx}>
              <CardHeader>
                <Text sx={styles.title}>Results from {q.title.default}</Text>
              </CardHeader>
              <CardBody>
                {election?.questions[idx].choices.map((c: any, i: number) => (
                  <Box key={i}>
                    <Text>{c.title.default}</Text>
                    <Flex sx={styles.choice}>
                      {totals && (
                        <>
                          <Text>
                            Votes: {c.results || 0} ({((Number(c.results) / totals[idx]) * 100 || 0).toFixed(0)}
                            %)
                          </Text>
                          <Box sx={styles.choiceResultWrapper}>
                            <Box
                              sx={styles.percentages}
                              w={`${((Number(c.results) / totals[idx]) * 100 || 0).toFixed(0)}%`}
                            />
                          </Box>
                        </>
                      )}
                    </Flex>
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
