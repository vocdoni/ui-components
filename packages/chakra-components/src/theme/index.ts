import { ConfirmModalTheme } from './confirm'
import { ElectionScheduleTheme as ElectionSchedule, ElectionTitleTheme as ElectionTitle } from './election'
import { EnvelopeTheme } from './envelope'
import { HorizontalRulerTheme } from './layout'
import {
  QuestionsTheme as ElectionQuestions,
  QuestionsConfirmationTheme,
  QuestionsTipTheme,
  QuestionsTypeBadgeTheme,
  QuestionsChoiceTheme,
} from './questions'
import { ResultsTheme as ElectionResults } from './results'
import { PaginationTheme as Pagination } from './pagination'
import { VoteWeightTheme } from './vote'

export const theme = {
  components: {
    Envelope: EnvelopeTheme,
    ElectionQuestions,
    ElectionResults,
    ElectionSchedule,
    ElectionTitle,
    HorizontalRuler: HorizontalRulerTheme,
    Pagination,
    ConfirmModal: ConfirmModalTheme,
    QuestionsConfirmation: QuestionsConfirmationTheme,
    QuestionsChoice: QuestionsChoiceTheme,
    QuestionsTip: QuestionsTipTheme,
    QuestionsTypeBadge: QuestionsTypeBadgeTheme,
    VoteWeight: VoteWeightTheme,
  } as any,
}

export * from './actions'
export * from './confirm'
export * from './election'
export * from './envelope'
export * from './layout'
export * from './pagination'
export * from './questions'
export * from './results'
export * from './spreadsheet'
export * from './vote'
