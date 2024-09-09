import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'
import { useStyleConfig } from '@chakra-ui/system'

export const PageButton = forwardRef<ButtonProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('PageButton', props)
  return <Button sx={styles} {...props} />
})
