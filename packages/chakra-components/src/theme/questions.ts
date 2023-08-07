import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

export const questionsAnatomy = [
  // main content wrapper
  'wrapper',
  // alert messages (voted or no questions available)
  'alert',
  'alertTitle',
  'alertDescription',
  'alertLink',
  // question wrapper
  'question',
  // question header
  'header',
  // question body
  'body',
  // question title
  'title',
  // question description
  'description',
  // form radio group
  'radioGroup',
  // questions stack
  'stack',
  // form radio
  'radio',
  // form error message
  'error',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

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

export const QuestionsTheme = defineMultiStyleConfig({
  baseStyle,
})
