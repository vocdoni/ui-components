import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/react-voting'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const Questions = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    wrapper: {},
    question: {},
    title: {},
    description: {}
  }),
})

export default Questions
