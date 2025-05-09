import { ButtonGroupProps, ButtonProps, ChakraProps, HeadingProps, InputProps, TagProps } from '@chakra-ui/react'
import {
  ClientProviderComponentProps,
  ElectionProviderComponentProps,
  VocdoniComponentDefinition,
} from '@vocdoni/react-providers'
import { PaginationResponse } from '@vocdoni/sdk'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import { IPFSImageProps } from './components/layout'

// Define the prop types for each component
export type ElectionActionProps = ChakraProps
export type ElectionDescriptionProps = Partial<ReactMarkdownProps> & ChakraProps
export type ElectionEnvelopeProps = ChakraProps & { votePackage: any }
export type ElectionHeaderProps = IPFSImageProps
export type ElectionQuestionsProps = ChakraProps
export type ElectionResultsProps = ChakraProps
export type ElectionScheduleProps = HeadingProps & {
  format?: string
  showRemaining?: boolean
  showCreatedAt?: boolean
}
export type ElectionSpreadsheetAccessProps = ChakraProps & {
  hashPrivateKey?: boolean
}
export type ElectionStatusBadgeProps = TagProps
export type ElectionTitleProps = HeadingProps
export type ElectionVoteButtonProps = ChakraProps
export type ElectionVoteWeightProps = ChakraProps

// Organization component props
export type OrganizationAvatarProps = ChakraProps
export type OrganizationDescriptionProps = ReactMarkdownProps & ChakraProps
export type OrganizationHeaderProps = ChakraProps
export type OrganizationNameProps = HeadingProps

// Account component props
export type AccountBalanceProps = TagProps

// Pagination component props
export type PaginationButtonProps = ChakraProps
export type PaginationEllipsisButtonProps = ChakraProps & {
  gotoPage: (page: number) => void
  inputProps?: InputProps
}
export type PaginationProps = ButtonGroupProps & {
  maxButtons?: number | false
  buttonProps?: ButtonProps
  inputProps?: InputProps
  pagination: PaginationResponse['pagination']
}

// Define our components structure matching VocdoniComponentDefinition
export interface ChakraVocdoniComponents extends VocdoniComponentDefinition {
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
  Organization: {
    Avatar: React.ComponentType<OrganizationAvatarProps>
    Description: React.ComponentType<OrganizationDescriptionProps>
    Header: React.ComponentType<OrganizationHeaderProps>
    Name: React.ComponentType<OrganizationNameProps>
  }
  Account: {
    Balance: React.ComponentType<AccountBalanceProps>
  }
  Pagination: {
    Button: React.ComponentType<PaginationButtonProps>
    EllipsisButton: React.ComponentType<PaginationEllipsisButtonProps>
    Pagination: React.ComponentType<PaginationProps>
  }
}

// Make each category's components optional
export type PartialChakraVocdoniComponents = {
  [Category in keyof ChakraVocdoniComponents]?: Partial<ChakraVocdoniComponents[Category]>
}

export interface ChakraClientProviderProps extends ClientProviderComponentProps {
  components?: PartialChakraVocdoniComponents
}
