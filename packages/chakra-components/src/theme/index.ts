import { ConfirmModalTheme } from './confirm'
import { ElectionScheduleTheme as ElectionSchedule, ElectionTitleTheme as ElectionTitle } from './election'
import { EnvelopeTheme } from './envelope'
import { HorizontalRulerTheme } from './layout'
import { PaginationTheme as Pagination } from './pagination'
import { QuestionChoiceTheme } from './question-choice'
import {
  QuestionsTheme as ElectionQuestions,
  QuestionsConfirmationTheme,
  QuestionsTipTheme,
  QuestionsTypeBadgeTheme,
} from './questions'
import { ResultsTheme as ElectionResults } from './results'
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
    QuestionChoice: QuestionChoiceTheme,
    QuestionsConfirmation: QuestionsConfirmationTheme,
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
export * from './question-choice'
export * from './questions'
export * from './results'
export * from './spreadsheet'
export * from './vote'
