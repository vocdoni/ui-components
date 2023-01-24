import { extendTheme } from '@chakra-ui/react'
import { theme as vtheme } from '@vocdoni/react-components'
import Questions from './questions'
import Radio from './radio'
import ViewVote from './view-vote'

const theme = extendTheme(vtheme, {
  components: {
    Questions,
    Radio,
    ViewVote,
  },
})

export default theme
