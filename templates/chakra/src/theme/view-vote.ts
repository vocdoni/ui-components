import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { viewVoteAnatomy } from '@vocdoni/react-voting'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(viewVoteAnatomy)

const ViewVote = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    title: {
      paddingTop: '.5em',
      position: 'relative',
      marginTop: '-2.5em',
      background: 'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.25) 35%, rgba(255,255,255,0) 100%)'
    },
  }),
})

export default ViewVote
