import { chakra, forwardRef, HeadingProps, omitThemingProps, useStyleConfig } from '@chakra-ui/react'
import { useElection, withRegistry } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'

const BaseElectionTitle = forwardRef<HeadingProps, 'h1'>((props, ref) => {
  const { election } = useElection()
  const styles = useStyleConfig('ElectionTitle', props)
  const rest = omitThemingProps(props)

  if (!election) return null

  const title = election instanceof PublishedElection ? election.title?.default : election.id

  return (
    <chakra.h1 ref={ref} title={title} __css={styles} {...rest}>
      {title}
    </chakra.h1>
  )
})
BaseElectionTitle.displayName = 'BaseElectionTitle'

export const ElectionTitle = withRegistry(BaseElectionTitle, 'Election', 'Title')
ElectionTitle.displayName = 'ElectionTitle'
