import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { theme } from '@chakra-ui/theme'

export const questionsAnatomy = [
  // Question wrapper
  'wrapper',
  // alert messages (voted or no questions available)
  'alert',
  'alertTitle',
  'alertDescription',
  'alertDescriptionWrapper', // Wrapper for multielection voted message
  'alertLink',
  // elections wrapper for multielections
  'elections',
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
  // form wrapper
  'form',
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

export const questionChoiceAnatomy = [
  // Choice Label
  'choiceLabel',
  // Image for the choice
  'choiceImage',
  // Wrapper for image and label
  'choiceWrapper',
  // Skeleton loader for the choice image
  'skeleton',
  // Skeleton loader for modal image
  'skeletonModal',
  // Modal
  'modalBody',
  'modalContent',
  'modalClose',
  // Modal description if exists on metadata
  'modalDescription',
  // Image on modal
  'modalImage',
  // Modal label (choice label)
  'modalLabel',
  'modalOverlay',
]

const { defineMultiStyleConfig: defineQuestionChoiceStyle, definePartsStyle: defineQuestionChoiceParts } =
  createMultiStyleConfigHelpers(questionChoiceAnatomy)

export const QuestionsChoiceTheme = defineQuestionChoiceStyle({
  baseStyle: defineQuestionChoiceParts({
    choiceWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalBody: {
      p: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    skeleton: {
      boxSize: '80px',
    },
    skeletonModal: {
      boxSize: '400px',
    },
  }),
})
