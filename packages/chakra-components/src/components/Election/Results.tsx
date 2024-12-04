import { Box, chakra, ChakraProps, Flex, Progress, Text, useMultiStyleConfig } from '@chakra-ui/react'
import { useClient, useDatesLocale, useElection } from '@vocdoni/react-providers'
import {
  ElectionResultsTypeNames,
  ElectionStatus,
  formatUnits,
  IChoice,
  IQuestion,
  PublishedElection,
} from '@vocdoni/sdk'
import { format } from 'date-fns'

const percent = (result: number, total: number) => ((Number(result) / total) * 100 || 0).toFixed(1) + '%'
export const results = (result: number, decimals?: number) =>
  decimals ? parseInt(formatUnits(BigInt(result), decimals), 10) : result

export const ElectionResults = (props: ChakraProps) => {
  const styles = useMultiStyleConfig('ElectionResults')
  const { election } = useElection()
  const { localize } = useClient()
  const locale = useDatesLocale()

  if (!election || !(election instanceof PublishedElection) || election?.status === ElectionStatus.CANCELED) return null

  if (election?.electionType.secretUntilTheEnd && election.status !== ElectionStatus.RESULTS) {
    return (
      <Text sx={styles.secret} {...props}>
        {localize('results.secret_until_the_end', {
          endDate: format(election.endDate, localize('results.date_format'), { locale }),
        })}
      </Text>
    )
  }

  const decimals = (election.meta as any)?.token?.decimals || 0
  const totalsAbstain = election?.questions.map((q) => ('numAbstains' in q ? Number(q.numAbstains) : 0))

  const totals = election?.questions
    .map((el, idx) => el.choices.reduce((acc, curr) => acc + Number(curr.results), totalsAbstain[idx]))
    .map((votes: number) => results(votes, decimals))

  return (
    <Flex sx={styles.wrapper} {...props}>
      {election?.questions.map((q: IQuestion, idx: number) => {
        const choices = electionChoices(election, q, localize('vote.abstain'))
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

const electionChoices = (election: PublishedElection, q: IQuestion, abstainLabel: string) => {
  const nchoices = [...q.choices]

  if (
    election.resultsType.name === ElectionResultsTypeNames.MULTIPLE_CHOICE &&
    election.resultsType.properties.canAbstain
  ) {
    const abstain: IChoice = {
      title: {
        default: abstainLabel,
      },
      results: q.numAbstains as string,
      value: -1,
    }
    nchoices.push(abstain)
  }
  return nchoices
}
