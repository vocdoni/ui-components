import { useClient, useDatesLocale, useElection } from '@vocdoni/react-providers'
import {
  ElectionResultsTypeNames,
  ElectionStatus,
  IChoice,
  IQuestion,
  IVoteEncryptedPackage,
  IVotePackage,
  PublishedElection,
} from '@vocdoni/sdk'
import { Text } from '@chakra-ui/react'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { format } from 'date-fns'

export const Envelope = ({
  votePackage,
  ...props
}: {
  votePackage: IVotePackage | IVoteEncryptedPackage
} & ChakraProps) => {
  const styles = useMultiStyleConfig('Envelope')
  const { localize } = useClient()
  const { election } = useElection()
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
            <ChoosedOptions question={q} questionIndex={i} votes={votePackage.votes} election={election} />
          </chakra.div>
        )
      })}
    </chakra.div>
  )
}

const ChoosedOptions = ({
  election,
  question,
  questionIndex,
  votes,
}: {
  election: PublishedElection
  question: IQuestion
  questionIndex: number
  votes: number[]
}) => {
  const styles = useMultiStyleConfig('Envelope')
  const { localize } = useClient()

  const selectedOptions: IChoice[] = []
  switch (election.resultsType.name) {
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      const abstainValues = election.resultsType?.properties?.abstainValues ?? []
      let abstainCount = 0
      votes.map((v) => {
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
      votes.map((v, i) => {
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
        <chakra.div key={i} sx={styles.choiceWrapper}>
          <Text sx={styles.choiceTitle}>{c.title.default}</Text>
        </chakra.div>
      ))}
    </>
  )
}
