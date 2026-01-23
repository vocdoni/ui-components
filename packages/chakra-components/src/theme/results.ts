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
  // choice body
  'choiceBody',
  // choice description
  'choiceDescription',
  // choice image wrapper
  'choiceImageWrapper',
  // choice image
  'choiceImage',
] as const

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
  choiceBody: {
    position: 'relative',
    px: 3,
    py: 2,
    align: 'center',
    justify: 'space-between',
  },
  choiceDescription: {
    color: 'black',
    pl: 2,
  },
  choiceImageWrapper: {
    ml: 4,
    flexShrink: 0,
    w: ['90px', '130px'],
    h: ['60px', '80px'],
    borderRadius: 'md',
    overflow: 'hidden',
  },
  choiceImage: {
    w: '100%',
    h: '100%',
    objectFit: 'cover',
  },
})

export const ResultsTheme = defineMultiStyleConfig({
  baseStyle,
})
