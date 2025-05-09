import { Button, Input, useMultiStyleConfig } from '@chakra-ui/react'
import { useLocalize, withRegistry } from '@vocdoni/react-providers'
import { useState } from 'react'
import { PaginationEllipsisButtonProps } from '../../types'

const BaseEllipsisButton = ({ gotoPage, inputProps, ...rest }: PaginationEllipsisButtonProps) => {
  const [ellipsisInput, setEllipsisInput] = useState(false)
  const localize = useLocalize()
  const styles = useMultiStyleConfig('EllipsisButton', rest)

  if (ellipsisInput) {
    return (
      <Input
        placeholder={localize('pagination.page_placeholder')}
        width='50px'
        sx={styles.input}
        {...inputProps}
        onKeyDown={(e) => {
          if (e.target instanceof HTMLInputElement && e.key === 'Enter') {
            const pageNumber = Number(e.target.value)
            gotoPage(pageNumber)
            setEllipsisInput(false)
          }
        }}
        onBlur={() => setEllipsisInput(false)}
        autoFocus
      />
    )
  }

  return (
    <Button
      as='a'
      href='#goto-page'
      sx={styles.button}
      {...rest}
      onClick={(e) => {
        e.preventDefault()
        setEllipsisInput(true)
      }}
    >
      ...
    </Button>
  )
}
BaseEllipsisButton.displayName = 'BaseEllipsisButton'

export const EllipsisButton = withRegistry(BaseEllipsisButton, 'Pagination', 'EllipsisButton')
EllipsisButton.displayName = 'EllipsisButton'
