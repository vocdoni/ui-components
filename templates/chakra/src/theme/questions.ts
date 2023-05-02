import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const Questions = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    // check questionsAnatomy to know what keys can be used here
  }),
})

export default Questions
