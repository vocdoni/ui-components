import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(radioAnatomy.keys)

const Radio = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'teal',
  },
})

export default Radio
