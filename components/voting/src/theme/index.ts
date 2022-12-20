import { theme as ctheme } from '@chakra-ui/theme'
import { Radio } from './forms'
import { Heading, HorizontalRuler } from './layout'
import { QuestionsTheme as Questions } from './questions'

const theme = {
  components: {
    Button: {
      variants: {
        voting: ctheme.components.Button.variants?.solid,
      },
    },
    Heading,
    HorizontalRuler,
    Radio,
    Questions,
  } as any,
}

export * from './questions'
export default theme
