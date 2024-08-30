import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

export const envelopeAnatomy = [
  // all questions wrapper
  'wrapper',
  // individual question wrapper
  'question',
  // question title
  'title',
  // choice wrapper
  'choiceWrapper',
  // choice title
  'choiceTitle',
  // secret envelope (no results until the end text)
  'secret',
  // Error boundary message
  'error',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(envelopeAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    pb: 0,
    fontWeight: 'bold',
  },
  secret: {
    color: 'red.200',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export const EnvelopeTheme = defineMultiStyleConfig({
  baseStyle,
})
