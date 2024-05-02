import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

export const VotwWeightAnatomy = [
  // confirmation wrapper box
  'wrapper',
  // title text
  'weight',
]

const { defineMultiStyleConfig: defineVoteWeightTipStyle, definePartsStyle: defineVoteWeightParts } =
  createMultiStyleConfigHelpers(VotwWeightAnatomy)

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
