import { extendTheme } from '@chakra-ui/react'
import { theme as vtheme } from '@vocdoni/components-voting'
import Questions from './questions'
import Radio from './radio'

const theme = extendTheme(vtheme, {
  components: {
    Questions,
    Radio,
  },
})

export default theme
