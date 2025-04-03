import { Alert, AlertDescription, AlertIcon, useMultiStyleConfig } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'

export const QuestionsEmpty = () => {
  const styles = useMultiStyleConfig('QuestionsEmpty')
  const { localize } = useElection()

  return (
    <Alert variant='subtle' status='warning' sx={styles.container}>
      <AlertIcon sx={styles.icon} />
      <AlertDescription sx={styles.description}>{localize('empty')}</AlertDescription>
    </Alert>
  )
}
