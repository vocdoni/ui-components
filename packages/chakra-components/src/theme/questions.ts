import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

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
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap-reverse',
    justifyContent: 'space-between',
    rowGap: '20px',
    columnGap: '50px',
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
  // main content wrapper
  'wrapper',
  // confirmation wrapper box
  'box',
  // title text
  'title',
  // Description if required
  'description',
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
