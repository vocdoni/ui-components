import { createMultiStyleConfigHelpers } from '@chakra-ui/system'

export const resultsAnatomy = [
  // wrapper
  'wrapper',
  // results card
  'card',
  // results card header
  'cardHeader',
  // results title
  'title',
  // results card body
  'cardBody',
  // choice result box
  'progress',
  // secret election (no results until the end text)
  'secret',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    direction: 'column',
    gap: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  secret: {
    color: 'red.200',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export const ResultsTheme = defineMultiStyleConfig({
  baseStyle,
})
