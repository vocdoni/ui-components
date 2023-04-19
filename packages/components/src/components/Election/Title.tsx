import { HeadingProps } from '@chakra-ui/layout'
import { chakra, forwardRef, omitThemingProps, useStyleConfig } from '@chakra-ui/system'

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
