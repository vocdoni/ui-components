import { extendTheme } from '@chakra-ui/react'
import { theme as vtheme } from '@vocdoni/react-components'
import { ElectionHeader, ElectionTitle } from './election'
import Questions from './questions'
import Radio from './radio'

const theme = extendTheme(vtheme, {
  components: {
    ElectionTitle,
    ElectionHeader,
    Questions,
    Radio,
  },
})

export default theme
