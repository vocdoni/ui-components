import { createMultiStyleConfigHelpers } from '@chakra-ui/system'

export const resultsAnatomy = [
  // results wrapper
  'results',
  // results flex box
  'resultsFlex',
  // results title
  'title',
  // choice result card
  'choiceResultCard',
  // choice result box
  'resultsProgress',
  // secret election no results text
  'textSecretElection',
  // form error message
  'error',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  results: {},
  resultsFlex: {
    direction: 'column',
    gap: 1,
  },
  resultsProgress: {
    colorScheme: 'pink',
    size: 'xs',
  },
  choiceResultCard: {
    bgColor: 'blue.400',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 1,
  },
  textSecretElection: {
    color: '#892BE2',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export const ResultsTheme = defineMultiStyleConfig({
  baseStyle,
})
