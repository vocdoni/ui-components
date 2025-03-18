import { Alert, AlertDescription, AlertIcon, AlertProps, useMultiStyleConfig } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'

export const QuestionsError = (props: AlertProps) => {
  const {
    errors: { voting: error },
  } = useElection()
  const styles = useMultiStyleConfig('QuestionsError')

  if (!error) return null

  return (
    <Alert status='error' variant='solid' mb={3} sx={styles.container} {...props}>
      <AlertIcon sx={styles.icon} />
      <AlertDescription sx={styles.description}>{error}</AlertDescription>
    </Alert>
  )
}
