import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import { Link } from '@chakra-ui/layout'
import { chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { useClient, useElection } from '@vocdoni/react-providers'
import reactStringReplace from 'react-string-replace'
import { environment } from '../../../environment'
import { useQuestionsForm } from './Form'

export const MultiElectionVoted = () => {
  const { voted, elections } = useQuestionsForm()
  if (!voted) {
    return null
  }
  const votes = Object.values(elections).map((e) => e.voted)
  return <VotedLogic voteds={votes} />
}

export const Voted = () => {
  const { voted } = useElection()
  if (!voted) {
    return null
  }
  return <VotedLogic voteds={[voted]} />
}

interface IVotedLogicProps {
  voteds: string[]
}

const VotedLogic = ({ voteds }: IVotedLogicProps) => {
  const { localize } = useElection()
  const styles = useMultiStyleConfig('ElectionQuestions')

  if (!(voteds?.length > 0)) {
    return null
  }

  return (
    <Alert
      variant='subtle'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      status='success'
      flexDir='column'
      isTruncated
      sx={styles.alert}
    >
      <AlertIcon />
      <AlertTitle sx={styles.alertTitle}>{localize('vote.voted_title')}</AlertTitle>
      <AlertDescription isTruncated maxW='100%' whiteSpace='initial' sx={styles.alertDescription}>
        {voteds.length === 1 ? <SingleElectionVoted voted={voteds[0]} /> : <MultipleElectionVoted voteds={voteds} />}
      </AlertDescription>
    </Alert>
  )
}

const SingleElectionVoted = ({ voted }: { voted: string }) => {
  const { localize } = useElection()
  const { env } = useClient()
  const styles = useMultiStyleConfig('ElectionQuestions')
  return reactStringReplace(localize('vote.voted_description', { id: voted }), voted, (match, k) => (
    <Link key={k} href={environment.verifyVote(env, voted)} target='_blank' isTruncated sx={styles.alertLink}>
      {match}
    </Link>
  ))
}

const MultipleElectionVoted = ({ voteds }: IVotedLogicProps) => {
  const { localize } = useElection()
  const { env } = useClient()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const votedsString = voteds.join(',')
  return (
    <chakra.div __css={styles.alertDescriptionWrapper}>
      {reactStringReplace(localize('vote.voted_description_multielection', { ids: votedsString }), votedsString, () => (
        <>
          {voteds.map((voted) => (
            <Link
              key={voted}
              href={environment.verifyVote(env, voted)}
              target='_blank'
              isTruncated
              sx={styles.alertLink}
            >
              {voted}
            </Link>
          ))}
        </>
      ))}
    </chakra.div>
  )
}
