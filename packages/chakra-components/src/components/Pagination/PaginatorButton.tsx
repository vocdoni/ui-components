import { useStyleConfig } from '@chakra-ui/system'
import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'

export const PaginatorButton = forwardRef<ButtonProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('PageButton', props)
  return <Button sx={styles} {...props} />
})
