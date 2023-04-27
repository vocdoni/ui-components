import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useElection } from './Election'

export const ResultsApproval = (props:ChakraProps) => {
  const styles = useMultiStyleConfig('Questions')
  const { election } = useElection()
  const totals = election?.questions.map((el) => el.choices.reduce((acc, curr) => acc + Number(curr.results), 0))
  const totals1 = election?.questions.map((el) => el.choices.reduce((acc, curr) => acc + Number(curr.results), 0))
  const results = [0,0,0,0]
  election?.questions.map((el) => el.choices.map((c,curr)=> results[curr]+=Number(c.results)))
  return (
    <chakra.div __css={styles.results} {...props}>
      {/* {election?.electionType.secretUntilTheEnd ? (
        <Text color='process.secret_until_the_end' textAlign='center' fontWeight='bold'>
          Secret until the end
        </Text>
      ) : */}
       (
        <Flex direction='column' gap={4}>
            <Card variant='results' key={0}>
              <CardHeader>
                <Text fontWeight='bold' mb={3}>
                  Results from {election?.questions[0].title.default}
                </Text>
              </CardHeader>
              <CardBody>
                {election?.questions[0].choices.map((c: any, i: number) => (
                  <Box key={i}>
                    <Text>{c.title.default}</Text>
                    <Flex alignItems='center' gap={4}>
                      {totals && (
                        <>
                          <Text>
                            Votes: {results[i] || 0} ({((Number(results[i]) / totals[0]) * 100 || 0).toFixed(0)}
                            %)
                          </Text>
                          <Box sx={styles.Box}>
                            <Box
                              w={`${((Number(results[i]) / totals[0]) * 100 || 0).toFixed(0)}%`}
                              bgColor='blue.400'
                              height='100%'
                            />
                          </Box>
                        </>
                      )}
                    </Flex>
                  </Box>
                ))}
              </CardBody>
            </Card>
          ))
        </Flex>
      )
      {/* } */}
    </chakra.div>
  )
}
