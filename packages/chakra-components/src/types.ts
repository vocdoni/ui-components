import { ChakraProps, HeadingProps, TagProps } from '@chakra-ui/react'
import { ClientProviderComponentProps, ElectionProviderComponentProps } from '@vocdoni/react-providers'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { IPFSImageProps } from './components/layout'

// Define the prop types for each component
export type ElectionActionProps = ChakraProps
export type ElectionDescriptionProps = ReactMarkdownProps & ChakraProps
export type ElectionEnvelopeProps = ChakraProps & { votePackage: any }
export type ElectionHeaderProps = IPFSImageProps
export type ElectionQuestionsProps = ChakraProps
export type ElectionResultsProps = ChakraProps
export type ElectionScheduleProps = HeadingProps & {
  format?: string
  showRemaining?: boolean
  showCreatedAt?: boolean
}
export type ElectionSpreadsheetAccessProps = ChakraProps
export type ElectionStatusBadgeProps = TagProps
export type ElectionTitleProps = HeadingProps
export type ElectionVoteButtonProps = ChakraProps
export type ElectionVoteWeightProps = ChakraProps

// Define our components structure matching VocdoniComponentDefinition
export interface ChakraVocdoniComponents {
  Election: {
    Actions: React.ComponentType<ElectionActionProps>
    Description: React.ComponentType<ElectionDescriptionProps>
    Election: React.ComponentType<ElectionProviderComponentProps>
    Envelope: React.ComponentType<ElectionEnvelopeProps>
    Header: React.ComponentType<ElectionHeaderProps>
    Questions: React.ComponentType<ElectionQuestionsProps>
    Results: React.ComponentType<ElectionResultsProps>
    Schedule: React.ComponentType<ElectionScheduleProps>
    SpreadsheetAccess: React.ComponentType<ElectionSpreadsheetAccessProps>
    StatusBadge: React.ComponentType<ElectionStatusBadgeProps>
    Title: React.ComponentType<ElectionTitleProps>
    VoteButton: React.ComponentType<ElectionVoteButtonProps>
    VoteWeight: React.ComponentType<ElectionVoteWeightProps>
  }
}

export interface ChakraClientProviderProps extends ClientProviderComponentProps {
  components?: Partial<ChakraVocdoniComponents>
}
