import { createMultiStyleConfigHelpers, defineStyleConfig } from '@chakra-ui/react'

export const FormLabel = defineStyleConfig({
  variants: {
    'question-title': {
      fontWeight: 'bold',
      fontSize: 'xl',
      marginBottom: 1,
    },
  },
})

const radio = createMultiStyleConfigHelpers(['container', 'control', 'label'])
export const Radio = radio.defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'teal',
    size: 'md',
  }
})
