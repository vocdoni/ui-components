import { createMultiStyleConfigHelpers, theme } from '@chakra-ui/react'

export const questionsAnatomy = [
  // main content wrapper
  'container',
  'form',
  // form radio group
  'radioGroup',
  // questions stack
  'stack',
  // form radio and checkboxes
  'radio',
  'checkbox',
  // form error message
  'error',
] as const

export const questionsEmptyAnatomy = ['container', 'icon', 'description'] as const
export const questionsErrorAnatomy = questionsEmptyAnatomy

export const questionsConfirmationAnatomy = [
  // confirmation wrapper box
  'box',
  // description text
  'description',
  // question wrapper
  'question',
  'title',
  'answer',
] as const

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({})

export const QuestionsTheme = defineMultiStyleConfig({
  baseStyle,
})

const { defineMultiStyleConfig: defineConfirmStyle, definePartsStyle: defineConfirmParts } =
  createMultiStyleConfigHelpers(questionsConfirmationAnatomy)

export const QuestionsConfirmationTheme = defineConfirmStyle({
  baseStyle: defineConfirmParts({
    question: {
      '& + &': {
        marginTop: 4,
      },
    },
    description: {
      marginBottom: 4,
    },
    title: {
      fontWeight: 'bold',
    },
  }),
})

export const questionTypeBadgeAnatomy = [
  // confirmation wrapper box
  'box',
  // title text
  'title',
  // badge tooltip
  'tooltip',
] as const

const { defineMultiStyleConfig: defineQuestionTypeBadgeStyle, definePartsStyle: defineQuestionTypeBadgeParts } =
  createMultiStyleConfigHelpers(questionTypeBadgeAnatomy)

export const QuestionsTypeBadgeTheme = defineQuestionTypeBadgeStyle({
  baseStyle: defineQuestionTypeBadgeParts({
    wrapper: {
      flexDirection: 'column',
      gap: 2,
    },
    title: {
      fontWeight: 'bold',
    },
  }),
})

export const questionTipAnatomy = [
  // confirmation wrapper box
  'wrapper',
  // title text
  'text',
] as const

const { defineMultiStyleConfig: defineQuestionTipStyle, definePartsStyle: defineQuestionTipParts } =
  createMultiStyleConfigHelpers(questionTipAnatomy)

export const QuestionsTipTheme = defineQuestionTipStyle({
  baseStyle: defineQuestionTipParts({
    wrapper: {
      mt: 4,
      w: 'full',
      display: 'flex',
      justifyContent: 'end',
      alignItems: 'end',
    },
    text: {
      ...theme.components.Heading.sizes?.sm,
    },
  }),
})
