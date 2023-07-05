import { HeadingProps } from '@chakra-ui/layout'
import { chakra, forwardRef, useMultiStyleConfig } from '@chakra-ui/system'
import { format as dformat } from 'date-fns'

import { InvalidElection } from '@vocdoni/sdk'
import { useDatesLocale, useLocalize } from '../../i18n/localize'
import { useElection } from './Election'

export type ElectionScheduleProps = HeadingProps & {
  format?: string
}

export const ElectionSchedule = forwardRef<ElectionScheduleProps, 'h2'>(({ format = 'PPpp', ...rest }, ref) => {
  const styles = useMultiStyleConfig('ElectionSchedule', rest)
  const { election } = useElection()
  const locale = useDatesLocale()
  const t = useLocalize()

  if (!election || election instanceof InvalidElection) return null

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
