import { HeadingProps } from '@chakra-ui/layout'
import { chakra, forwardRef, omitThemingProps, useStyleConfig } from '@chakra-ui/system'

import { useElection } from './Election'

export const ElectionFormError = forwardRef<HeadingProps, 'p'>((props, ref) => {
  const { formError, localize } = useElection()
  const styles = useStyleConfig('ElectionFormError', props)
  const rest = omitThemingProps(props)

  if (!formError) return null

  return (
    <chakra.p ref={ref} color='red.300' {...rest} __css={styles}>
      {localize('vote.missing_answers')}
    </chakra.p>
  )
})
ElectionFormError.displayName = 'ElectionFormError'
