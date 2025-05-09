import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react'
import { ElectionProvider, ElectionProviderComponentProps, useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { HR } from '../layout'
import {
  ElectionActions,
  ElectionDescription,
  ElectionHeader,
  ElectionQuestion,
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
  const { election } = useElection()

  if (!election) {
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertDescription>Election not found</AlertDescription>
      </Alert>
    )
  }

  if (!(election instanceof PublishedElection)) {
    return null
  }

  return (
    <>
      <ElectionStatusBadge />
      <ElectionTitle />
      <ElectionDescription />
      <ElectionHeader />
      <ElectionSchedule />
      <HR />
      <ElectionActions />
      <HR />
      <SpreadsheetAccess />
      <VoteButton />
      {election.questions.map((question, index) => (
        <ElectionQuestion key={index} question={question} index={index.toString()} />
      ))}
      <ElectionResults />
    </>
  )
}
