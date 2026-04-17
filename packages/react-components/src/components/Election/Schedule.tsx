import { ElectionStatus } from '@vocdoni/sdk'
import { format as dformat, formatDistance } from 'date-fns'
import { ComponentPropsWithoutRef, useSyncExternalStore } from 'react'
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

const subscribe = () => () => {}
const useIsHydrationRender = () =>
  useSyncExternalStore(
    subscribe,
    () => false,
    () => true
  )
const formatDeterministicDate = (date: Date) => date.toISOString()

export const ElectionSchedule = ({
  format = 'PPp',
  showRemaining = false,
  showCreatedAt = false,
  ...rest
}: ElectionScheduleProps) => {
  const { election } = useElection()
  const t = useReactComponentsLocalize()
  const { ElectionSchedule: Slot } = useComponents()
  const isHydrationRender = useIsHydrationRender()
  const startDate = getElectionDate(election, 'startDate')
  const endDate = getElectionDate(election, 'endDate')
  const creationTime = getElectionDate(election, 'creationTime')
  const status = getElectionStatus(election)

  if (!election || !startDate || !endDate || !status) return null

  const getRemaining = (now: Date): string => {
    switch (status) {
      case ElectionStatus.ONGOING:
      case ElectionStatus.RESULTS:
        if (endDate < now) {
          return t('schedule.ended', {
            distance: formatDistance(endDate, now, { addSuffix: true }),
          })
        }
        return formatDistance(endDate, now, { addSuffix: true })
      case ElectionStatus.ENDED:
        return t('schedule.ended', {
          distance: formatDistance(endDate, now, { addSuffix: true }),
        })
      case ElectionStatus.PAUSED:
        if (now < startDate) {
          return t('schedule.paused_start', {
            distance: formatDistance(startDate, now, { addSuffix: true }),
          })
        }
        return t('schedule.paused_end', {
          distance: formatDistance(endDate, now, { addSuffix: true }),
        })
      case ElectionStatus.UPCOMING:
      default:
        return formatDistance(startDate, now, { addSuffix: true })
    }
  }

  const getDeterministicText = () => {
    if (showCreatedAt && creationTime) {
      return t('schedule.created', {
        distance: formatDeterministicDate(creationTime),
      })
    }

    return t('schedule.from_begin_to_end', {
      begin: formatDeterministicDate(startDate),
      end: formatDeterministicDate(endDate),
    })
  }

  let text = getDeterministicText()

  if (!isHydrationRender) {
    const now = new Date()

    text = t('schedule.from_begin_to_end', {
      begin: dformat(startDate, format),
      end: dformat(endDate, format),
    })

    if (showRemaining) {
      text = getRemaining(now)
    } else if (showCreatedAt && creationTime) {
      text = t('schedule.created', {
        distance: formatDistance(creationTime, now, { addSuffix: true }),
      })
    }
  }

  return <Slot {...rest} text={text} />
}
