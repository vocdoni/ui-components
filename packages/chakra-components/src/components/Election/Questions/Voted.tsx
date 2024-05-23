import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import { Link } from '@chakra-ui/layout'
import { useMultiStyleConfig } from '@chakra-ui/system'
import { useClient, useElection } from '@vocdoni/react-providers'
import reactStringReplace from 'react-string-replace'
import { environment } from '../../../environment'

export const Voted = () => {
  const { env } = useClient()
  const { localize, voted } = useElection()
  const styles = useMultiStyleConfig('ElectionQuestions')

  if (!voted) {
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
        {reactStringReplace(localize('vote.voted_description', { id: voted }), voted, (match, k) => (
          <Link key={k} href={environment.verifyVote(env, voted)} target='_blank' isTruncated sx={styles.alertLink}>
            {match}
          </Link>
        ))}
      </AlertDescription>
    </Alert>
  )
}
