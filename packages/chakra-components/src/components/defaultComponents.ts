import { ChakraVocdoniComponents } from '../types'
import { Balance } from './Account/Balance'
import { ElectionActions } from './Election/Actions/Actions'
import { ElectionDescription } from './Election/Description'
import { Election } from './Election/Election'
import { Envelope } from './Election/Envelope'
import { ElectionHeader } from './Election/Header'
import { ElectionQuestion } from './Election/Questions/Fields'
import { ElectionResults } from './Election/Results'
import { ElectionSchedule } from './Election/Schedule'
import { SpreadsheetAccess } from './Election/SpreadsheetAccess'
import { ElectionStatusBadge } from './Election/StatusBadge'
import { ElectionTitle } from './Election/Title'
import { VoteButton } from './Election/VoteButton'
import { VoteWeight } from './Election/VoteWeight'
import { OrganizationAvatar } from './Organization/Avatar'
import { OrganizationDescription } from './Organization/Description'
import { OrganizationHeader } from './Organization/Header'
import { OrganizationName } from './Organization/Name'
import { PaginationButton } from './Pagination/Button'
import { EllipsisButton } from './Pagination/EllipsisButton'
import { Pagination } from './Pagination/Pagination'

export const defaultComponents: ChakraVocdoniComponents = {
  Election: {
    Actions: ElectionActions,
    Description: ElectionDescription,
    Election,
    Envelope,
    Header: ElectionHeader,
    Questions: ElectionQuestion,
    Results: ElectionResults,
    Schedule: ElectionSchedule,
    SpreadsheetAccess,
    StatusBadge: ElectionStatusBadge,
    Title: ElectionTitle,
    VoteButton,
    VoteWeight,
  },
  Organization: {
    Avatar: OrganizationAvatar,
    Description: OrganizationDescription,
    Header: OrganizationHeader,
    Name: OrganizationName,
  },
  Account: {
    Balance,
  },
  Pagination: {
    Button: PaginationButton,
    EllipsisButton,
    Pagination,
  },
}
