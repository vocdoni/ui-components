import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

export const voteWeightAnatomy = [
  // confirmation wrapper box
  'wrapper',
  // title text
  'weight',
] as const

const { defineMultiStyleConfig: defineVoteWeightTipStyle, definePartsStyle: defineVoteWeightParts } =
  createMultiStyleConfigHelpers(voteWeightAnatomy)

export const VoteWeightTheme = defineVoteWeightTipStyle({
  baseStyle: defineVoteWeightParts({
    wrapper: {
      display: 'flex',
      gap: 2,
    },
    weight: {
      fontWeight: 'bold',
    },
  }),
})
