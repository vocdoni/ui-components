import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/alert'
import { ElectionProvider, ElectionProviderComponentProps, useElection } from '@vocdoni/react-providers'
import { HR } from '../layout'
import {
  ElectionActions,
  ElectionDescription,
  ElectionHeader,
  ElectionQuestions,
  ElectionResults,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionTitle,
  VoteButton,
} from './'
import { SpreadsheetAccess } from './SpreadsheetAccess'

export const Election = (props: ElectionProviderComponentProps) => (
  <ElectionProvider {...props} fetchCensus>
    <ElectionBody />
  </ElectionProvider>
)
Election.displayName = 'Election'

// Not exported since we're not allowing it to be configured. If you want to customize it past
// this level, create a custom Election component with the provided election components.
const ElectionBody = () => {
  const {
    errors: { election: error },
    election,
    connected,
  } = useElection()

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <ElectionHeader />
      <ElectionTitle />
      <ElectionSchedule />
      <ElectionStatusBadge />
      <ElectionActions />
      <ElectionDescription />
      <HR />
      <ElectionQuestions />
      <VoteButton />
      {election?.get('census.type') === 'spreadsheet' && connected && <SpreadsheetAccess />}
      <ElectionResults />
    </>
  )
}
