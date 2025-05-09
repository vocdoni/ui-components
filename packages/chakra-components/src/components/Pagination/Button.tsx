import { Button, forwardRef, useStyleConfig } from '@chakra-ui/react'
import { withRegistry } from '@vocdoni/react-providers'
import { PaginationButtonProps } from '../../types'

const BasePaginationButton = forwardRef<PaginationButtonProps, 'button'>((props, ref) => {
  const styles = useStyleConfig('PaginationButton', props)
  return <Button ref={ref} sx={styles} {...props} />
})
BasePaginationButton.displayName = 'BasePaginationButton'

export const PaginationButton = withRegistry(BasePaginationButton, 'Pagination', 'Button')
PaginationButton.displayName = 'PaginationButton'
