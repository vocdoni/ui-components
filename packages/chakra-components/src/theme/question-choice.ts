import { createMultiStyleConfigHelpers, SystemStyleObject } from '@chakra-ui/react'

export const questionChoiceAnatomy = [
  // Choice Label
  'label',
  // Image for the choice
  'image',
  // Wrapper for image and label
  'wrapper',
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
] as const

export type QuestionChoiceAnatomyRecord = Record<(typeof questionChoiceAnatomy)[number], SystemStyleObject>

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionChoiceAnatomy)

export const QuestionChoiceTheme = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
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
