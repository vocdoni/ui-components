import { chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { format } from 'date-fns'

import { HR, Image, Markdown } from '../layout'
import { useElectionContext } from "./Election"

export const ElectionTitle = () => {
  const styles = useMultiStyleConfig('Election')
  const { election } = useElectionContext()

  if (!election) return null

  return (
    <chakra.h1 __css={styles.title}>
      {election.title.default}
    </chakra.h1>
  )
}

export const ElectionHeader = () => {
  const styles = useMultiStyleConfig('Election')
  const { election } = useElectionContext()

  if (!election || (election && !election.header)) return null

  return (
    <Image src={election.header} sx={styles.image} />
  )
}

export const ElectionDescription = () => {
  const styles = useMultiStyleConfig('Election')
  const { election }  = useElectionContext()

  if (!election || (election && !election.description)) return null

  return (
    <Markdown sx={styles.description}>
      {election.description.default}
    </Markdown>
  )
}

export const ElectionDate = () => {
  const styles = useMultiStyleConfig('Election')
  const { election } = useElectionContext()

  if (!election) return null

  return (
    <chakra.h2 __css={styles.date}>
      Voting period {format(new Date(election.startDate), 'd-L-y HH:mm')} ~&nbsp;
      {format(new Date(election.endDate), 'd-L-y HH:mm')}
    </chakra.h2>
  )
}

export const ElectionSeparator = () => {
  const styles = useMultiStyleConfig('Election')
  return <HR sx={styles.hr} />
}
