import { createMultiStyleConfigHelpers, radioAnatomy } from '@chakra-ui/react'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(radioAnatomy.keys)

const Radio = defineMultiStyleConfig({
  defaultProps: {
    colorScheme: 'teal',
  },
})

export default Radio
