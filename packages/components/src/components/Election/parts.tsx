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
import { format } from 'date-fns'
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

export const ElectionSchedule = forwardRef<HeadingProps, 'h2'>((props, ref) => {
  const styles = useMultiStyleConfig('ElectionSchedule', props)
  const { election } = useElection()

  if (!election) return null

  return (
    <chakra.h2 __css={styles} {...props}>
      Voting period {format(new Date(election.startDate), 'd-L-y HH:mm')} ~&nbsp;
      {format(new Date(election.endDate), 'd-L-y HH:mm')}
    </chakra.h2>
  )
})
ElectionSchedule.displayName = 'ElectionSchedule'

export const ElectionStatusBadge = (props: TagProps) => {
  const { election } = useElection()

  if (!election) return null

  return (
    <Tag sx={{ textTransform: 'capitalize' }} {...props}>
      {(ElectionStatus[election.status] as string).toLowerCase()}
    </Tag>
  )
}
