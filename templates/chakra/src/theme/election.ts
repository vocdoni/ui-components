import { ComponentStyleConfig } from '@chakra-ui/react'

export const ElectionHeader: ComponentStyleConfig = {
  baseStyle: {
    '& + h1': {
      minHeight: '3em',
    },
  },
}

export const ElectionTitle: ComponentStyleConfig = {
  baseStyle: ({ colorMode }) => ({
    'img + &': {
      paddingY: '.5em',
      position: 'relative',
      marginTop: '-2.5em',
      background:
        colorMode === 'dark'
          ? 'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 30%)',
    },
  }),
}
