import { ConfirmModalTheme } from './confirm'
import { ElectionScheduleTheme as ElectionSchedule, ElectionTitleTheme as ElectionTitle } from './election'
import { HorizontalRulerTheme } from './layout'
import {
  QuestionsConfirmationTheme,
  QuestionsTheme as ElectionQuestions,
  QuestionsTipTheme,
  QuestionsTypeBadgeTheme,
} from './questions'
import { ResultsTheme as ElectionResults } from './results'
import { VoteWeightTheme } from './vote'
import { EnvelopeTheme } from './envelope'

export const theme = {
  components: {
    Envelope: EnvelopeTheme,
    ElectionQuestions,
    ElectionResults,
    ElectionSchedule,
    ElectionTitle,
    HorizontalRuler: HorizontalRulerTheme,
    ConfirmModal: ConfirmModalTheme,
    QuestionsConfirmation: QuestionsConfirmationTheme,
    QuestionsTip: QuestionsTipTheme,
    QuestionsTypeBadge: QuestionsTypeBadgeTheme,
    VoteWeight: VoteWeightTheme,
  } as any,
}

export * from './actions'
export * from './confirm'
export * from './envelope'
export * from './election'
export * from './layout'
export * from './questions'
export * from './results'
export * from './spreadsheet'
export * from './vote'
