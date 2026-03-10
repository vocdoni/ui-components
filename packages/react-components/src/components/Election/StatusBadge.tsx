import { ElectionStatus, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useElection } from '~providers'

export const ElectionStatusBadge = (props: ComponentPropsWithoutRef<'span'> & Record<string, unknown>) => {
  const { election } = useElection()
  const localize = useReactComponentsLocalize()
  const { ElectionStatusBadge: Slot } = useComponents()

  if (!election) return null

  let tone: 'success' | 'warning' | 'danger' = 'success'

  if (
    election instanceof PublishedElection &&
    [ElectionStatus.PAUSED, ElectionStatus.ENDED].includes(election.status)
  ) {
    tone = 'warning'
  }

  if (
    election instanceof InvalidElection ||
    [ElectionStatus.CANCELED, ElectionStatus.PROCESS_UNKNOWN].includes(election.status)
  ) {
    tone = 'danger'
  }

  const label =
    election instanceof PublishedElection && election.status
      ? localize(`statuses.${election.status.toLowerCase()}`)
      : localize('statuses.invalid')

  return <Slot {...props} tone={tone} label={label} />
}
