import { Button, ButtonProps } from '@chakra-ui/button'
import { forwardRef, useStyleConfig } from '@chakra-ui/system'

export const PageButton = forwardRef<ButtonProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('PageButton', props)
  return <Button sx={styles} {...props} />
})
