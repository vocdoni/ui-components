import { HeadingProps } from '@chakra-ui/layout'
import { chakra, forwardRef, omitThemingProps, useStyleConfig } from '@chakra-ui/system'
import { useElection } from '@vocdoni/react-providers'

export const ElectionTitle = forwardRef<HeadingProps, 'h1'>((props, ref) => {
  const { election } = useElection()
  const styles = useStyleConfig('ElectionTitle', props)
  const rest = omitThemingProps(props)

  if (!election) return null
  const title = election.title?.default || election.id

  return (
    <chakra.h1 ref={ref} title={title} __css={styles} {...rest}>
      {title}
    </chakra.h1>
  )
})
ElectionTitle.displayName = 'ElectionTitle'
