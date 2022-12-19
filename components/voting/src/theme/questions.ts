import { createMultiStyleConfigHelpers } from '@chakra-ui/system'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(['wrapper', 'question', 'title', 'description'])

const baseStyle = definePartsStyle({
  question: {
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 'xl',
    marginBottom: 1,
  },
  description: {
    marginBottom: 4,
  },
})

const Questions = defineMultiStyleConfig({
  baseStyle,
})

export default Questions
