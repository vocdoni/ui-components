import { HeadingProps } from '@chakra-ui/layout'
import {
  chakra,
  ChakraProps,
  forwardRef,
  omitThemingProps,
  useMultiStyleConfig,
  useStyleConfig,
} from '@chakra-ui/system'
import { Tag, TagProps } from '@chakra-ui/tag'
import { ElectionStatus } from '@vocdoni/sdk'
import { format as dformat } from 'date-fns'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

import { Image, IPFSImageProps, Markdown } from '../layout'
import { useElection } from './Election'

export const ElectionTitle = forwardRef<HeadingProps, 'h1'>((props, ref) => {
  const { election } = useElection()
  const styles = useStyleConfig('ElectionTitle', props)
  const rest = omitThemingProps(props)

  if (!election) return null

  return (
    <chakra.h1 ref={ref} {...rest} __css={styles}>
      {election.title.default}
    </chakra.h1>
  )
})
ElectionTitle.displayName = 'ElectionTitle'

export const ElectionHeader = (props: IPFSImageProps) => {
  const styles = useStyleConfig('ElectionHeader', props)
  const { election } = useElection()

  if (!election || (election && !election.header)) return null

  return <Image src={election.header} sx={styles} {...props} />
}

export const ElectionDescription = (props: Omit<ReactMarkdownProps, 'children' | 'node'> & ChakraProps) => {
  const styles = useStyleConfig('ElectionDescription', props)
  const { election } = useElection()

  if (!election || (election && !election.description)) return null

  return (
    <Markdown {...props} sx={styles}>
      {election.description.default}
    </Markdown>
  )
}

export type ElectionScheduleProps = HeadingProps & {
  format?: string
}

export const ElectionSchedule = forwardRef<ElectionScheduleProps, 'h2'>(({ format, ...rest }, ref) => {
  const styles = useMultiStyleConfig('ElectionSchedule', rest)
  const { election } = useElection()

  let f = format
  if (!f) {
    f = 'd-L-y HH:mm'
  }

  if (!election) return null

  return (
    <chakra.h2 __css={styles} {...rest}>
      Voting period {dformat(new Date(election.startDate), f)} ~&nbsp;
      {dformat(new Date(election.endDate), f)}
    </chakra.h2>
  )
})
ElectionSchedule.displayName = 'ElectionSchedule'

export const ElectionStatusBadge = (props: TagProps) => {
  const { election, trans } = useElection()

  if (!election) return null

  const defaults: Record<keyof typeof ElectionStatus, string> = {
    PROCESS_UNKNOWN: 'Unknown',
    UPCOMING: 'Upcoming',
    ONGOING: 'Ongoing',
    ENDED: 'Ended',
    CANCELED: 'Canceled',
    PAUSED: 'Paused',
    RESULTS: 'Results',
  }

  let { colorScheme } = props
  if (!colorScheme) {
    colorScheme = 'green'

    if ([ElectionStatus.PAUSED, ElectionStatus.ENDED].includes(election.status)) {
      colorScheme = 'yellow'
    }
    if ([ElectionStatus.CANCELED, ElectionStatus.PROCESS_UNKNOWN].includes(election.status)) {
      colorScheme = 'red'
    }
  }

  return (
    <Tag sx={{ textTransform: 'capitalize' }} colorScheme={colorScheme} {...props}>
      {trans(election.status, defaults[election.status])}
    </Tag>
  )
}
