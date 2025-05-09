import { chakra, forwardRef, useMultiStyleConfig } from '@chakra-ui/react'
import { useDatesLocale, useElection, useLocalize, withRegistry } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { format as dformat, formatDistance } from 'date-fns'
import { ElectionScheduleProps } from '../../types'

const BaseElectionSchedule = forwardRef<ElectionScheduleProps, 'h2'>(
  ({ format = 'PPp', showRemaining = false, showCreatedAt = false, ...rest }, ref) => {
    const styles = useMultiStyleConfig('ElectionSchedule', rest)
    const { election } = useElection()
    const locale = useDatesLocale()
    const t = useLocalize()

    if (!election || !(election instanceof PublishedElection)) return null

    const getRemaining = (): string => {
      const endDate = election.endDate
      const startDate = election.startDate
      switch (election.status) {
        case ElectionStatus.ONGOING:
        case ElectionStatus.RESULTS: {
          if (endDate < new Date()) {
            return t('schedule.ended', {
              distance: formatDistance(endDate, new Date(), {
                addSuffix: true,
                locale,
              }),
            })
          }
          return formatDistance(endDate, new Date(), { addSuffix: true, locale })
        }
        case ElectionStatus.ENDED:
          return t('schedule.ended', {
            distance: formatDistance(endDate, new Date(), {
              addSuffix: true,
              locale,
            }),
          })
        case ElectionStatus.PAUSED:
          if (new Date() < startDate) {
            return t('schedule.paused_start', {
              distance: formatDistance(startDate, new Date(), {
                addSuffix: true,
                locale,
              }),
            })
          }
          return t('schedule.paused_end', {
            distance: formatDistance(endDate, new Date(), {
              addSuffix: true,
              locale,
            }),
          })
        case ElectionStatus.UPCOMING:
        default:
          return formatDistance(startDate, new Date(), { addSuffix: true, locale })
      }
    }

    let text = t('schedule.from_begin_to_end', {
      begin: dformat(new Date(election.startDate), format, { locale }),
      end: dformat(new Date(election.endDate), format, { locale }),
    })
    if (showRemaining) {
      text = getRemaining()
    } else if (showCreatedAt) {
      text = t('schedule.created', {
        distance: formatDistance(election.creationTime, new Date(), {
          addSuffix: true,
          locale,
        }),
      })
    }

    return (
      <chakra.h2 __css={styles} {...rest} ref={ref}>
        {text}
      </chakra.h2>
    )
  }
)
BaseElectionSchedule.displayName = 'BaseElectionSchedule'

export const ElectionSchedule = withRegistry(BaseElectionSchedule, 'Election', 'Schedule')
ElectionSchedule.displayName = 'ElectionSchedule'
