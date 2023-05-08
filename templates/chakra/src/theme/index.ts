import { extendTheme } from '@chakra-ui/react'
import { theme as vtheme } from '@vocdoni/chakra-components'
import { ElectionHeader, ElectionTitle } from './election'
import Questions from './questions'
import Radio from './radio'
import Results from './results'

const theme = extendTheme(vtheme, {
  components: {
    ElectionTitle,
    ElectionHeader,
    Questions,
    Radio,
    Results,
  },
})

export default theme
