import { defineStyleConfig } from '@chakra-ui/react'

export const Heading = defineStyleConfig({
  variants: {
    subtitle: {
      fontStyle: 'italic',
      color: 'gray.400',
    },
  },
})

export const HorizontalRuler = defineStyleConfig({
  baseStyle: {
    width: '100%',
    height: '2px',
    backgroundColor: 'gray.300',
    marginTop: '1.2em',
    marginBottom: '1.5em',
  },
})
