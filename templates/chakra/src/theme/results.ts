import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const Results = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    // check resultsAnatomy to know what keys can be used here
    choiceResultCard: { size: 'lg' },
    resultsProgress: {
      colorScheme: 'green',
      size: 'lg',
    },
  }),
})

export default Results
