import { chakra, ChakraProps, useStyleConfig } from '@chakra-ui/react'

type HRProps = ChakraProps & {
  variant?: string
}

export const HR = (props: HRProps) => {
  const { variant, ...rest } = props
  const styles = useStyleConfig('HorizontalRuler', { variant })

  return <chakra.div __css={styles} {...rest} as='hr' />
}

HR.displayName = 'HorizontalRuler'
