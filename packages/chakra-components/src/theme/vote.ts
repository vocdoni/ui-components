import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

export const VoteWeightAnatomy = [
  // confirmation wrapper box
  'wrapper',
  // title text
  'weight',
]

const { defineMultiStyleConfig: defineVoteWeightTipStyle, definePartsStyle: defineVoteWeightParts } =
  createMultiStyleConfigHelpers(VoteWeightAnatomy)

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
