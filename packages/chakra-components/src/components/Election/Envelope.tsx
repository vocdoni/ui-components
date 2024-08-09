import { List, ListItem } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/react'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useDatesLocale, useElection } from '@vocdoni/react-providers'
import {
  ElectionResultsTypeNames,
  ElectionStatus,
  IChoice,
  IQuestion,
  IVoteEncryptedPackage,
  IVotePackage,
  PublishedElection,
} from '@vocdoni/sdk'
import { format } from 'date-fns'

export type VotePackageType = IVotePackage | IVoteEncryptedPackage

export const Envelope = ({
  votePackage,
  ...props
}: {
  votePackage: VotePackageType
} & ChakraProps) => {
  const styles = useMultiStyleConfig('Envelope')
  const { election, localize } = useElection()
  const locale = useDatesLocale()

  if (
    !election ||
    'encrypted' in votePackage ||
    !(election instanceof PublishedElection) ||
    election?.status === ElectionStatus.CANCELED
  )
    return null

  if (election?.electionType.secretUntilTheEnd && election.status !== ElectionStatus.RESULTS) {
    return (
      <Text sx={styles.secret} {...props}>
        {localize('results.secret_until_the_end', {
          endDate: format(election.endDate, localize('results.date_format'), { locale }),
        })}
      </Text>
    )
  }

  return (
    <chakra.div sx={styles.wrapper} {...props}>
      {election.questions.map((q, i) => {
        return (
          <chakra.div sx={styles.question}>
            <Text sx={styles.title}>{localize('envelopes.question_title', { title: q.title.default })}</Text>
            <SelectedOptions question={q} questionIndex={i} votes={votePackage.votes} />
          </chakra.div>
        )
      })}
    </chakra.div>
  )
}

const SelectedOptions = ({
  question,
  questionIndex,
  votes,
}: {
  question: IQuestion
  questionIndex: number
  votes: number[]
}) => {
  const { election, localize } = useElection()
  const styles = useMultiStyleConfig('Envelope')

  if (!election || !(election instanceof PublishedElection)) return null

  const selectedOptions: IChoice[] = []
  switch (election.resultsType.name) {
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      const abstainValues = election.resultsType?.properties?.abstainValues ?? []
      let abstainCount = 0
      votes.forEach((v) => {
        if (abstainValues.includes(v.toString())) {
          abstainCount++
          return
        }
        selectedOptions.push(question.choices[v])
      })
      if (abstainCount > 0) {
        selectedOptions.push({
          title: {
            default: localize('envelopes.envelope_abstain_count', { count: abstainCount }),
          },
          results: abstainCount.toString(),
          value: -1,
        } as IChoice)
      }
      break
    case ElectionResultsTypeNames.APPROVAL:
      votes.forEach((v, i) => {
        if (v > 0) selectedOptions.push(question.choices[i])
      })
      break
    case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
      selectedOptions.push(question.choices[votes[questionIndex]])
      break
    default:
      selectedOptions.push(question.choices[votes[0]])
  }

  return (
    <>
      {selectedOptions.map((c, i) => (
        <List key={i} sx={styles.choiceWrapper}>
          <ListItem sx={styles.choiceTitle}>{c.title.default}</ListItem>
        </List>
      ))}
    </>
  )
}
