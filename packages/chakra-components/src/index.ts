// Export components
export * from './components'

// Export environment and theme
export * from './environment'
export * from './theme'

// Export client provider
export { ClientProvider } from './client'
export type { ChakraClientProviderProps } from './types'

// Export component types
export type {
  ChakraVocdoniComponents,
  ElectionActionProps,
  ElectionDescriptionProps,
  ElectionEnvelopeProps,
  ElectionHeaderProps,
  ElectionQuestionsProps,
  ElectionResultsProps,
  ElectionScheduleProps,
  ElectionSpreadsheetAccessProps,
  ElectionStatusBadgeProps,
  ElectionTitleProps,
  ElectionVoteButtonProps,
  ElectionVoteWeightProps,
} from './types'

// Export default components for initialization
export { defaultComponents } from './components/defaultComponents'
