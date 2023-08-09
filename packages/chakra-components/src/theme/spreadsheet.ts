import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

export const spreadsheetAccessAnatomy = [
  // main action button
  'button',
  // disconnect/logout button
  'disconnect',
  // modal parts
  'content',
  'header',
  'body',
  'footer',
  // top close button
  'top_close',
  // bottom close button
  'close',
  // form parts
  'control',
  'label',
  'input',
  'error',
  'submit',
]

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(spreadsheetAccessAnatomy)

const baseStyle = definePartsStyle({
  label: {
    textTransform: 'capitalize',
  },
})

export const SpreadsheetAccessTheme = defineMultiStyleConfig({
  baseStyle,
})
