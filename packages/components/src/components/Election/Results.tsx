import { Box, Card, CardBody, CardHeader, Flex, Text } from '@chakra-ui/react'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useElection } from './Election'

export const Results = (props:ChakraProps) => {
  const styles = useMultiStyleConfig('Questions')
  const { election } = useElection()
  const totals = election?.questions.map((el) => el.choices.reduce((acc, curr) => acc + Number(curr.results), 0))

  return (
    <chakra.div __css={styles.results} {...props}>
      {/* {election?.electionType.secretUntilTheEnd ? (
        <Text color='process.secret_until_the_end' textAlign='center' fontWeight='bold'>
          Secret until the end
        </Text>
      ) : */}
       (
        <Flex direction='column' gap={4}>
          {election?.questions.map((q: any, idx: number) => (
            <Card variant='results' key={idx}>
              <CardHeader>
                <Text fontWeight='bold' mb={3}>
                  Results from {q.title.default}
                </Text>
              </CardHeader>
              <CardBody>
                {election?.questions[idx].choices.map((c: any, i: number) => (
                  <Box key={i}>
                    <Text>{c.title.default}</Text>
                    <Flex alignItems='center' gap={4}>
                      {totals && (
                        <>
                          <Text>
                            Votes: {c.results || 0} ({((Number(c.results) / totals[idx]) * 100 || 0).toFixed(0)}
                            %)
                          </Text>
                          <Box sx={styles.Box}>
                            <Box
                              w={`${((Number(c.results) / totals[idx]) * 100 || 0).toFixed(0)}%`}
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
          ))}
        </Flex>
      )
      {/* } */}
    </chakra.div>
  )
}
