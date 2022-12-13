import { extendTheme } from '@chakra-ui/react'
import { theme as btheme } from '@vocdoni/components-voting'
import { FormLabel, Radio, RadioGroup } from './forms'
import { Heading, Text } from './layout'

const theme = extendTheme({
  ...btheme,
  components: {
    ...btheme.components,
    FormLabel,
    Heading,
    Radio,
    RadioGroup,
    Text,
  } as any,
  colors: {
    brand: {
      100: '#9AE898',
      900: '#4BC6BF'
    },
  },
})

export default theme
