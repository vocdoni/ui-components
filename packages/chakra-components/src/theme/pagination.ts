import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export const paginationAnatomy = [
  // Top level wrapper
  'wrapper',
  // wrapper for buttons
  'buttonGroup',
  // total results text
  'totalResults',
] as const

export const ellipsisButtonAnatomy = ['input', 'button'] as const

const { defineMultiStyleConfig: defineVoteWeightTipStyle, definePartsStyle: defineVoteWeightParts } =
  createMultiStyleConfigHelpers(paginationAnatomy)

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
