import { HeadingProps } from '@chakra-ui/layout'
import { chakra, forwardRef, useMultiStyleConfig } from '@chakra-ui/system'
import { useDatesLocale, useElection, useLocalize } from '@vocdoni/react-providers'
import { ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { format as dformat, formatDistance } from 'date-fns'

export type ElectionScheduleProps = HeadingProps & {
  format?: string
  showRemaining?: boolean // If true, it return the remaining time to start, end, if ended or paused, instead of the full schedule
}

export const ElectionSchedule = forwardRef<ElectionScheduleProps, 'h2'>(
  ({ format = 'PPp', showRemaining = false, ...rest }, ref) => {
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

    return (
      <chakra.h2 __css={styles} {...rest}>
        {showRemaining
          ? getRemaining()
          : t('schedule.from_begin_to_end', {
              begin: dformat(new Date(election.startDate), format, { locale }),
              end: dformat(new Date(election.endDate), format, { locale }),
            })}
      </chakra.h2>
    )
  }
)

ElectionSchedule.displayName = 'ElectionSchedule'
