import { chakra, HTMLChakraProps, useStyleConfig } from "@chakra-ui/system"

type VariantBoxProps = HTMLChakraProps<'div'> & {
  variant?: string
}

const VariantBox = (props: VariantBoxProps) => {
  const { variant, ...rest } = props
  const styles = useStyleConfig('VariantBox', { variant })

  return <chakra.div __css={styles} {...rest} />
}

VariantBox.displayName = 'VariantBox'

export default VariantBox
