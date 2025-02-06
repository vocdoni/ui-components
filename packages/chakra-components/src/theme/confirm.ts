import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

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
] as const

export const signModalAnatomy = ['body', 'description', 'footer', 'button']

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(confirmAnatomy)

const baseStyle = definePartsStyle({
  footer: {
    gap: 3,
  },
})

export const ConfirmModalTheme = defineMultiStyleConfig({
  baseStyle,
})
