import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export const questionAnatomy = [
  // question wrapper
  'container',
  // parts
  'header',
  'body',
  'title',
  'description',
] as const

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionAnatomy)

const baseStyle = definePartsStyle({
  container: {
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column',
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

export const QuestionTheme = defineMultiStyleConfig({ baseStyle })
