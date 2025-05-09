import { ChakraVocdoniComponents } from '../types'
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

// Initialize all components with their proper types
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
}
