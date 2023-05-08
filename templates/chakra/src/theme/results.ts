import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { resultsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(resultsAnatomy)

const ElectionResults = defineMultiStyleConfig({
  baseStyle: definePartsStyle({}),
})

export default ElectionResults
