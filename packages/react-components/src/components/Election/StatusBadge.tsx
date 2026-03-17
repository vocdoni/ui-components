import { ElectionStatus } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useElection } from '~providers'
import { getElectionStatus, isInvalidElectionLike } from '~providers/election/normalized'

export const ElectionStatusBadge = (props: ComponentPropsWithoutRef<'span'> & Record<string, unknown>) => {
  const { election } = useElection()
  const localize = useReactComponentsLocalize()
  const { ElectionStatusBadge: Slot } = useComponents()

  if (!election) return null

  let tone: 'success' | 'warning' | 'danger' = 'success'
  const status = getElectionStatus(election)

  if (status && ([ElectionStatus.PAUSED, ElectionStatus.ENDED] as string[]).includes(status)) {
    tone = 'warning'
  }

  if (
    isInvalidElectionLike(election) ||
    (status && ([ElectionStatus.CANCELED, ElectionStatus.PROCESS_UNKNOWN] as string[]).includes(status))
  ) {
    tone = 'danger'
  }

  const label = isInvalidElectionLike(election)
    ? localize('statuses.invalid')
    : status
    ? localize(`statuses.${status.toLowerCase()}`)
    : localize('statuses.invalid')

  return <Slot {...props} tone={tone} label={label} />
}
