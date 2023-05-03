import { createMultiStyleConfigHelpers } from '@chakra-ui/system'

export const resultsAnatomy = [
  // results wrapper
  'results',
  // results flex box
  'resultsFlex',
  // results title
  'title',
  // choice flex box
  'choice',
  // choice result wrapper
  'choiceResultWrapper',
  // percentages box
  'percentages',
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
  choices: {
    alignItems: 'center',
    gap: 4,
  },
  choiceResultWrapper: {
    backgroundColor: 'gray.100',
    width: 48,
    height: 2.5,
  },
  percentages: {
    bgColor: 'blue.400',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 1,
  },
  description: {
    marginBottom: 4,
  },
})

export const ResultsTheme = defineMultiStyleConfig({
  baseStyle,
})
