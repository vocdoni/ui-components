import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const radio = createMultiStyleConfigHelpers(['container', 'control', 'label'])
export const Radio = radio.defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'teal',
    size: 'md',
  }
})
