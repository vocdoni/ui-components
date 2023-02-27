import { ImageProps } from '@chakra-ui/image'
import { HeadingProps } from '@chakra-ui/layout'
import { chakra, ChakraComponent, useMultiStyleConfig } from '@chakra-ui/system'
import { Tag, TagProps } from '@chakra-ui/tag'
import { ElectionStatus } from '@vocdoni/sdk'
import { format } from 'date-fns'

import { HR, Image, Markdown } from '../layout'
import { useElectionContext } from "./Election"

const Title = (props: ChakraComponent<'h1', HeadingProps>) => {
  const styles = useMultiStyleConfig('Election')
  const { election } = useElectionContext()

  if (!election) return null

  return (
    <chakra.h1 __css={styles.title} {...props}>
      {election.title.default}
    </chakra.h1>
  )
}
export const ElectionTitle = chakra(Title)
ElectionTitle.displayName = 'ElectionTitle'


const Header = (props: ChakraComponent<'img', ImageProps>) => {
  const styles = useMultiStyleConfig('Election')
  const { election } = useElectionContext()

  if (!election || (election && !election.header)) return null

  return (
    <Image src={election.header} sx={styles.image} {...props} />
  )
}
export const ElectionHeader = chakra(Header)
ElectionHeader.displayName = 'ElectionHeader'


const Description = (props: ChakraComponent<'div', {}>) => {
  const styles = useMultiStyleConfig('Election')
  const { election }  = useElectionContext()

  if (!election || (election && !election.description)) return null

  return (
    <Markdown sx={styles.description} {...props}>
      {election.description.default}
    </Markdown>
  )
}
export const ElectionDescription = chakra(Description)
ElectionDescription.displayName = 'ElectionDescription'


const Schedule = (props: ChakraComponent<'h2', HeadingProps>) => {
  const styles = useMultiStyleConfig('Election')
  const { election } = useElectionContext()

  if (!election) return null

  return (
    <chakra.h2 __css={styles.date} {...props}>
      Voting period {format(new Date(election.startDate), 'd-L-y HH:mm')} ~&nbsp;
      {format(new Date(election.endDate), 'd-L-y HH:mm')}
    </chakra.h2>
  )
}
export const ElectionSchedule = chakra(Schedule)
ElectionSchedule.displayName = 'ElectionSchedule'


const Separator = (props: ChakraComponent<'hr', {}>) => {
  const styles = useMultiStyleConfig('Election')
  return <HR sx={styles.hr} {...props} />
}
export const ElectionSeparator = chakra(Separator)
ElectionSeparator.displayName = 'ElectionSeparator'


const StatusBadge = (props: ChakraComponent<'span', TagProps>) => {
  const { election } = useElectionContext()

  if (!election) return null

  return (
    <Tag sx={{textTransform: 'capitalize'}} {...props}>
      {(ElectionStatus[election.status] as string).toLowerCase()}
    </Tag>
  )
}
export const ElectionStatusBadge = chakra(StatusBadge)
ElectionStatusBadge.displayName = 'ElectionStatusBadge'
