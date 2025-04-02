import { Button, ButtonProps, Input, InputProps, useStyleConfig } from '@chakra-ui/react'
import { useLocalize } from '@vocdoni/react-providers'
import { useState } from 'react'

type EllipsisButtonProps = ButtonProps & {
  gotoPage: (page: number) => void
  inputProps?: InputProps
}

export const EllipsisButton = ({ gotoPage, inputProps, ...rest }: EllipsisButtonProps) => {
  const [ellipsisInput, setEllipsisInput] = useState(false)
  const localize = useLocalize()
  const styles = useStyleConfig('EllipsisButton', rest)

  if (ellipsisInput) {
    return (
      <Input
        placeholder={localize('pagination.page_placeholder')}
        width='50px'
        sx={styles}
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
      sx={styles}
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
EllipsisButton.displayName = 'EllipsisButton'
