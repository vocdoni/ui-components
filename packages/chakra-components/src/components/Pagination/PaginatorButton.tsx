import { Button, ButtonProps, forwardRef, useStyleConfig } from '@chakra-ui/react'

export const PageButton = forwardRef<ButtonProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('PageButton', props)
  return <Button sx={styles} {...props} />
})
PageButton.displayName = 'PageButton'
