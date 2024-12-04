import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export const resultsAnatomy = [
  // all questions wrapper
  'wrapper',
  // individual question results
  'question',
  // result header
  'header',
  // result title
  'title',
  // result body
  'body',
  // choice result box
  'progress',
  // secret election (no results until the end text)
  'secret',
  // choice title/label
  'choiceTitle',
  // choice number of votes
  'choiceVotes',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {
    flexDirection: 'column',
    gap: 2,
  },
  header: {
    pb: 0,
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
