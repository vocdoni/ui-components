import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

export const confirmAnatomy = [
  // modal parts
  'content',
  'header',
  'body',
  'footer',
  // action buttons
  'confirm',
  'cancel',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(confirmAnatomy)

const baseStyle = definePartsStyle({
  footer: {
    gap: 3,
  },
})

export const ConfirmModalTheme = defineMultiStyleConfig({
  baseStyle,
})
