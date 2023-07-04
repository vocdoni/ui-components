import { Tag, TagProps } from '@chakra-ui/tag'
import { ElectionStatus } from '@vocdoni/sdk'

import { useElection } from './Election'

export const ElectionStatusBadge = (props: TagProps) => {
  const { election, trans } = useElection()

  if (!election) return null

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
    <Tag colorScheme={colorScheme} {...props}>
      {trans(`statuses.${election.status}`)}
    </Tag>
  )
}
