import type { Theme } from '@chakra-ui/theme'
import { theme as ctheme } from '@chakra-ui/theme'
import { FormLabel, Radio } from './forms'
import { Heading, HorizontalRuler, Text, VariantBox } from './layout'

const theme : Theme = {
  ...ctheme,
  components: {
    Button: ctheme.components.Button,
    FormLabel,
    Heading,
    HorizontalRuler,
    Radio: {
      ...ctheme.components.Radio,
      ...Radio,
    },
    Text,
    VariantBox,
  } as any,
}

export default theme
