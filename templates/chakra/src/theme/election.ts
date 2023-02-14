import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { electionAnatomy } from '@vocdoni/react-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(electionAnatomy)

const Election = defineMultiStyleConfig({
  baseStyle: ({colorMode}) => definePartsStyle({
    image: {
      minHeight: '3em',
    },
    title: {
      paddingY: '.5em',
      position: 'relative',
      marginTop: '-2.5em',
      background: colorMode === 'dark' ?
        'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0) 100%)' :
        'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 30%)',
    },
  })
})

export default Election
