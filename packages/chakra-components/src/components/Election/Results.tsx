import { Box, Flex, Text } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/progress'
import { ChakraProps, chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { useClient, useDatesLocale, useElection } from '@vocdoni/react-providers'
import {
  ElectionResultsTypeNames,
  ElectionStatus,
  IChoice,
  InvalidElection,
  PublishedElection,
  formatUnits,
} from '@vocdoni/sdk'
import { format } from 'date-fns'

const percent = (result: number, total: number) => ((Number(result) / total) * 100 || 0).toFixed(0) + '%'
const results = (result: number, decimals?: number) =>
  decimals ? parseInt(formatUnits(BigInt(result), decimals), 10) : result

export const ElectionResults = (props: ChakraProps) => {
  const styles = useMultiStyleConfig('ElectionResults')
  const { election } = useElection()
  const { localize } = useClient()
  const locale = useDatesLocale()

  if (!election || election instanceof InvalidElection || election?.status === ElectionStatus.CANCELED) return null

  if (election?.electionType.secretUntilTheEnd && election.status !== ElectionStatus.RESULTS) {
    return (
      <Text sx={styles.secret} {...props}>
        {localize('results.secret_until_the_end', {
          endDate: format(election.endDate, localize('results.date_format'), { locale }),
        })}
      </Text>
    )
  }

  console.log('election:', election)
  const decimals = (election.meta as any)?.token?.decimals || 0
  const totals = election?.questions
    .map((el) => el.choices.reduce((acc, curr) => acc + Number(curr.results), 0))
    .map((votes: number) => results(votes, decimals))
  console.log('totals:', totals)
  return (
    <Flex sx={styles.wrapper} {...props}>
      {election?.questions.map((q: any, idx: number) => {
        const choices = electionChoices(election, q.choices, localize('vote.abstain'))
        console.log('choices:', choices)
        return (
          <chakra.div key={idx} sx={styles.question}>
            <chakra.div sx={styles.header}>
              <Text sx={styles.title}>{localize('results.title', { title: q.title.default })}</Text>
            </chakra.div>
            <chakra.div sx={styles.body}>
              {choices.map((c: any, i: number) => (
                <Box key={i}>
                  {totals && (
                    <>
                      <Text sx={styles.choiceTitle}>{c.title.default}</Text>
                      <Text sx={styles.choiceVotes}>
                        {localize('results.votes', {
                          votes: results(c.results, decimals) || 0,
                          percent: percent(results(c.results, decimals), totals[idx]),
                        })}
                      </Text>
                      <Progress
                        sx={styles.progress}
                        value={((Number(c.results) / totals[idx]) * 100) / 10 ** decimals || 0}
                      />
                    </>
                  )}
                </Box>
              ))}
            </chakra.div>
          </chakra.div>
        )
      })}
    </Flex>
  )
}

const electionChoices = (election: PublishedElection, choices: IChoice[], abstainLabel: string) => {
  const nchoices = [...choices]
  if (election.resultsType.name === ElectionResultsTypeNames.MULTIPLE_CHOICE) {
    console.log('received results:', election.results)
    const results = election.results[0].map((val, key) => parseInt(val, 10) + parseInt(election.results[1][key], 10))
    for (const k in nchoices) {
      nchoices[k].results = results[parseInt(nchoices[k].value, 10)]
    }
    const abstain = {
      title: {
        default: abstainLabel,
      },
      results: 0,
    }
    for (const id of election.resultsType.properties.abstainValues) {
      abstain.results += parseInt(results[id], 10)
    }
    nchoices.push(abstain)
  }
  return nchoices
}
