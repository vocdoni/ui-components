import { Alert, AlertDescription, AlertIcon, AlertTitle, Link, useMultiStyleConfig } from '@chakra-ui/react'
import { useClient, useElection } from '@vocdoni/react-providers'
import reactStringReplace from 'react-string-replace'
import { environment } from '../../../environment'

export const Voted = () => {
  const { env } = useClient()
  const { localize, voted } = useElection()
  const styles = useMultiStyleConfig('Voted')

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
      sx={styles.container}
    >
      <AlertIcon sx={styles.icon} />
      <AlertTitle sx={styles.title}>{localize('vote.voted_title')}</AlertTitle>
      <AlertDescription isTruncated maxW='100%' whiteSpace='initial' sx={styles.description}>
        {reactStringReplace(localize('vote.voted_description', { id: voted }), voted, (match, k) => (
          <Link key={k} href={environment.verifyVote(env, voted)} target='_blank' isTruncated sx={styles.link}>
            {match}
          </Link>
        ))}
      </AlertDescription>
    </Alert>
  )
}
