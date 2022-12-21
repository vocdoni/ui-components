import { createMultiStyleConfigHelpers } from '@chakra-ui/system'
import { theme } from '@chakra-ui/theme'

export const questionsViewAnatomy = [
  'wrapper',
  'title',
  'date',
  'description',
  'hr',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsViewAnatomy)

const baseStyle = definePartsStyle({
  wrapper: {},
  title: {
    ...theme.components.Heading.baseStyle,
    ...theme.components.Heading.sizes?.xl,
    textAlign: 'center',
    lineHeight: 1.1,
    mb: 3,
  },
  date: {
    ...theme.components.Heading.baseStyle,
    ...theme.components.Heading.sizes?.sm,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray.400',
  },
})

export const ViewVoteTheme = defineMultiStyleConfig({
  baseStyle,
})
