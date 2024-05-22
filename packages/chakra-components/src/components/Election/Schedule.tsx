import { HeadingProps } from '@chakra-ui/layout'
import { chakra, forwardRef, useMultiStyleConfig } from '@chakra-ui/system'
import { useDatesLocale, useElection, useLocalize } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { format as dformat } from 'date-fns'

export type ElectionScheduleProps = HeadingProps & {
  format?: string
}

export const ElectionSchedule = forwardRef<ElectionScheduleProps, 'h2'>(({ format = 'PPp', ...rest }, ref) => {
  const styles = useMultiStyleConfig('ElectionSchedule', rest)
  const { election } = useElection()
  const locale = useDatesLocale()
  const t = useLocalize()

  if (!election || !(election instanceof PublishedElection)) return null

  return (
    <chakra.h2 __css={styles} {...rest}>
      {t('schedule', {
        begin: dformat(new Date(election.startDate), format, { locale }),
        end: dformat(new Date(election.endDate), format, { locale }),
      })}
    </chakra.h2>
  )
})
ElectionSchedule.displayName = 'ElectionSchedule'
