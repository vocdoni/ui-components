import { createMultiStyleConfigHelpers } from '@chakra-ui/system'

export const questionsAnatomy = [
  // main questions wrapper
  'wrapper',
  // alert message (when no questions are available)
  'alert',
  // question wrapper
  'question',
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
  // vote button
  'button',
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
