import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

export const confirmAnatomy = [
  // modal parts
  'overlay',
  'content',
  'header',
  'body',
  'footer',
  // action buttons
  'confirm',
  'cancel',
  'close',
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
