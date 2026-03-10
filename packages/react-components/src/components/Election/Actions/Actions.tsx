import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useClient, useElection } from '~providers'
import { ActionsProvider } from './ActionsProvider'
import { ActionCancel } from './Cancel'
import { ActionContinue } from './Continue'
import { ActionEnd } from './End'
import { ActionPause } from './Pause'

export const ElectionActions = (props: ComponentPropsWithoutRef<'div'>) => {
  const { account } = useClient()
  const { election } = useElection()
  const { ElectionActions: Slot } = useComponents()

  if (
    !election ||
    !(election instanceof PublishedElection) ||
    !areEqualHexStrings(election.organizationId, account?.address) ||
    [ElectionStatus.CANCELED, ElectionStatus.ENDED, ElectionStatus.RESULTS].includes(election.status)
  ) {
    return null
  }

  return (
    <Slot
      {...props}
      actions={
        <ActionsProvider>
          <ActionContinue />
          <ActionPause />
          <ActionEnd />
          <ActionCancel />
        </ActionsProvider>
      }
    />
  )
}
