import { HeadingProps } from '@chakra-ui/layout'
import { chakra, forwardRef, useMultiStyleConfig } from '@chakra-ui/system'
import { format as dformat } from 'date-fns'

import { useElection } from './Election'

export type ElectionScheduleProps = HeadingProps & {
  format?: string
}

export const ElectionSchedule = forwardRef<ElectionScheduleProps, 'h2'>(({ format = 'd-L-y HH:mm', ...rest }, ref) => {
  const styles = useMultiStyleConfig('ElectionSchedule', rest)
  const { election } = useElection()

  if (!election) return null

  return (
    <chakra.h2 __css={styles} {...rest}>
      Voting period {dformat(new Date(election.startDate), format)} ~&nbsp;
      {dformat(new Date(election.endDate), format)}
    </chakra.h2>
  )
})
ElectionSchedule.displayName = 'ElectionSchedule'
