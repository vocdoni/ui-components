import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { theme } from '@chakra-ui/theme'

export const questionsAnatomy = [
  // main content wrapper
  'wrapper',
  // alert messages (voted or no questions available)
  'alert',
  'alertTitle',
  'alertDescription',
  'alertLink',
  // question wrapper
  'question',
  // question header
  'header',
  // question body
  'body',
  // question title
  'title',
  // Question type badge wrapper
  'typeBadgeWrapper',
  // question description
  'description',
  // form radio group
  'radioGroup',
  // questions stack
  'stack',
  // form radio and checkboxes
  'radio',
  'checkbox',
  // Abstain badge to count number of remaining votes to abstain
  'abstainBadge',
  // form error message
  'error',
]

export const questionsConfirmationAnatomy = [
  // confirmation wrapper box
  'box',
  // description text
  'description',
  // question wrapper
  'question',
  'title',
  'answer',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const baseStyle = definePartsStyle({
  question: {
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  typeBadgeWrapper: {
    w: 'full',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 'xl',
    marginBottom: 1,
  },
  description: {
    marginBottom: 4,
  },
  abstainBadge: {
    ml: '5px',
  },
})

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
]

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
]

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
