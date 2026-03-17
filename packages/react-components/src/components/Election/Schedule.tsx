import { ElectionStatus } from '@vocdoni/sdk'
import { format as dformat, formatDistance } from 'date-fns'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useElection } from '~providers'
import { getElectionDate, getElectionStatus } from '~providers/election/normalized'

export type ElectionScheduleProps = ComponentPropsWithoutRef<'p'> &
  Record<string, unknown> & {
    format?: string
    showRemaining?: boolean
    showCreatedAt?: boolean
  }

export const ElectionSchedule = ({
  format = 'PPp',
  showRemaining = false,
  showCreatedAt = false,
  ...rest
}: ElectionScheduleProps) => {
  const { election } = useElection()
  const t = useReactComponentsLocalize()
  const { ElectionSchedule: Slot } = useComponents()
  const startDate = getElectionDate(election, 'startDate')
  const endDate = getElectionDate(election, 'endDate')
  const creationTime = getElectionDate(election, 'creationTime')
  const status = getElectionStatus(election)

  if (!election || !startDate || !endDate || !status) return null

  const getRemaining = (): string => {
    switch (status) {
      case ElectionStatus.ONGOING:
      case ElectionStatus.RESULTS:
        if (endDate < new Date()) {
          return t('schedule.ended', {
            distance: formatDistance(endDate, new Date(), { addSuffix: true }),
          })
        }
        return formatDistance(endDate, new Date(), { addSuffix: true })
      case ElectionStatus.ENDED:
        return t('schedule.ended', {
          distance: formatDistance(endDate, new Date(), { addSuffix: true }),
        })
      case ElectionStatus.PAUSED:
        if (new Date() < startDate) {
          return t('schedule.paused_start', {
            distance: formatDistance(startDate, new Date(), { addSuffix: true }),
          })
        }
        return t('schedule.paused_end', {
          distance: formatDistance(endDate, new Date(), { addSuffix: true }),
        })
      case ElectionStatus.UPCOMING:
      default:
        return formatDistance(startDate, new Date(), { addSuffix: true })
    }
  }

  let text = t('schedule.from_begin_to_end', {
    begin: dformat(new Date(startDate), format),
    end: dformat(new Date(endDate), format),
  })

  if (showRemaining) {
    text = getRemaining()
  } else if (showCreatedAt && creationTime) {
    text = t('schedule.created', {
      distance: formatDistance(creationTime, new Date(), { addSuffix: true }),
    })
  }

  return <Slot {...rest} text={text} />
}
