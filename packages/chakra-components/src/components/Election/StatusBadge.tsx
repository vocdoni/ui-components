import { Tag, TagProps } from '@chakra-ui/tag'
import { useElection } from '@vocdoni/react-providers'
import { ElectionStatus, InvalidElection } from '@vocdoni/sdk'

export const ElectionStatusBadge = (props: TagProps) => {
  const { election, localize } = useElection()

  if (!election) return null

  let { colorScheme } = props
  if (!colorScheme) {
    colorScheme = 'green'

    if ([ElectionStatus.PAUSED, ElectionStatus.ENDED].includes(election.status)) {
      colorScheme = 'yellow'
    }
    if (
      [ElectionStatus.CANCELED, ElectionStatus.PROCESS_UNKNOWN].includes(election.status) ||
      election instanceof InvalidElection
    ) {
      colorScheme = 'red'
    }
  }

  return (
    <Tag colorScheme={colorScheme} {...props}>
      {election.status ? localize(`statuses.${election.status.toLowerCase()}`) : localize('statuses.invalid')}
    </Tag>
  )
}
