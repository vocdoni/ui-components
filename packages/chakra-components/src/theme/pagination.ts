import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export const PaginationAnatomy = [
  // Top level wrapper
  'wrapper',
  // wrapper for buttons
  'buttonGroup',
  // total results text
  'totalResults',
]

const { defineMultiStyleConfig: defineVoteWeightTipStyle, definePartsStyle: defineVoteWeightParts } =
  createMultiStyleConfigHelpers(PaginationAnatomy)

export const PaginationTheme = defineVoteWeightTipStyle({
  baseStyle: defineVoteWeightParts({
    wrapper: {},
    buttonGroup: {
      flexWrap: 'wrap',
      rowGap: '2',
    },
    totalResults: {},
  }),
})
