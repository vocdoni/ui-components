import { Tag } from '@chakra-ui/react'
import { useElection, withRegistry } from '@vocdoni/react-providers'
import { ElectionStatus, InvalidElection, PublishedElection } from '@vocdoni/sdk'
import { ElectionStatusBadgeProps } from '../../types'

const BaseElectionStatusBadge = (props: ElectionStatusBadgeProps) => {
  const { election, localize } = useElection()

  if (!election) return null

  let { colorScheme } = props
  if (!colorScheme) {
    colorScheme = 'green'

    if (
      election instanceof PublishedElection &&
      [ElectionStatus.PAUSED, ElectionStatus.ENDED].includes(election.status)
    ) {
      colorScheme = 'yellow'
    }
    if (
      election instanceof InvalidElection ||
      [ElectionStatus.CANCELED, ElectionStatus.PROCESS_UNKNOWN].includes(election.status)
    ) {
      colorScheme = 'red'
    }
  }

  return (
    <Tag colorScheme={colorScheme} {...props}>
      {election instanceof PublishedElection && election.status
        ? localize(`statuses.${election.status.toLowerCase()}`)
        : localize('statuses.invalid')}
    </Tag>
  )
}
BaseElectionStatusBadge.displayName = 'BaseElectionStatusBadge'

export const ElectionStatusBadge = withRegistry(BaseElectionStatusBadge, 'Election', 'StatusBadge')
ElectionStatusBadge.displayName = 'ElectionStatusBadge'
