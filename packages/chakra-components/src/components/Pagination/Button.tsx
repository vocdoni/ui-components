import { Button, ButtonProps, forwardRef, useStyleConfig } from '@chakra-ui/react'

export const PaginationButton = forwardRef<ButtonProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('PaginationButton', props)
  return <Button sx={styles} {...props} />
})
PaginationButton.displayName = 'PaginationButton'
