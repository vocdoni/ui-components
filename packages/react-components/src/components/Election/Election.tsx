import { PublishedElection } from '@vocdoni/sdk'
import { useComponents } from '~components/context/useComponents'
import { ElectionProvider, ElectionProviderComponentProps, useElection } from '~providers'
import { ElectionActions } from './Actions'
import { ElectionDescription } from './Description'
import { ElectionHeader } from './Header'
import { ElectionQuestions } from './Questions'
import { ElectionResults } from './Results'
import { ElectionSchedule } from './Schedule'
import { SpreadsheetAccess } from './SpreadsheetAccess'
import { ElectionStatusBadge } from './StatusBadge'
import { ElectionTitle } from './Title'
import { VoteButton } from './VoteButton'

export const Election = (props: ElectionProviderComponentProps) => (
  <ElectionProvider {...props} fetchCensus>
    <ElectionBody />
  </ElectionProvider>
)

const ElectionBody = () => {
  const {
    errors: { election: error },
    election,
    connected,
  } = useElection()
  const { HR } = useComponents()

  if (error) {
    return <p>{error}</p>
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
      {election instanceof PublishedElection && election.get('census.type') === 'spreadsheet' && connected ? (
        <SpreadsheetAccess />
      ) : null}
      <ElectionResults />
    </>
  )
}
