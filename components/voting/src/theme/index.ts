import { StyleFunctionProps } from '@chakra-ui/system'
import type { Theme } from '@chakra-ui/theme'
import { theme as ctheme } from '@chakra-ui/theme'
import { Radio } from './forms'
import { Heading, HorizontalRuler } from './layout'
import Questions from './questions'

const theme : Theme = {
  ...ctheme,
  components: {
    Button: {
      ...ctheme.components.Button,
      variants: {
        ...ctheme.components.Button.variants,
        voting: (props: StyleFunctionProps) => ({
          ...ctheme.components.Button.variants?.solid(props),
        })
      }
    },
    Heading,
    HorizontalRuler,
    Radio: {
      ...ctheme.components.Radio,
      ...Radio,
    },
    Questions,
  } as any,
}

export default theme
