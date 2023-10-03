import { ConfirmModalTheme } from './confirm'
import { ElectionScheduleTheme as ElectionSchedule, ElectionTitleTheme as ElectionTitle } from './election'
import { HorizontalRulerTheme } from './layout'
import { QuestionsTheme as ElectionQuestions, QuestionsConfirmationTheme } from './questions'
import { ResultsTheme as ElectionResults } from './results'

export const theme = {
  components: {
    ElectionQuestions,
    ElectionResults,
    ElectionSchedule,
    ElectionTitle,
    HorizontalRuler: HorizontalRulerTheme,
    ConfirmModal: ConfirmModalTheme,
    QuestionsConfirmation: QuestionsConfirmationTheme,
  } as any,
}

export * from './actions'
export * from './confirm'
export * from './election'
export * from './layout'
export * from './questions'
export * from './results'
export * from './spreadsheet'
