import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { questionsAnatomy } from '@vocdoni/components-voting'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const Questions = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    wrapper: {
      border: '1px solid red',
      margin: 3,
      padding: 2,
    },
    question: {
      border: '1px solid blue',
      margin: 3,
      padding: 2,
    },
    title: {
      border: '1px solid green',
      margin: 3,
      padding: 2,
    },
    description: {
      border: '1px solid orange',
      margin: 3,
      padding: 2,
    }
  }),
})

export default Questions
