import { ConfirmModalTheme } from './confirm'
import { ElectionScheduleTheme as ElectionSchedule, ElectionTitleTheme as ElectionTitle } from './election'
import { HorizontalRulerTheme } from './layout'
import { QuestionsTheme as ElectionQuestions, QuestionsConfirmationTheme } from './questions'
import { ResultsTheme as ElectionResults } from './results'
import { SpreadsheetAccessTheme } from './spreadsheet'

export const theme = {
  components: {
    ElectionQuestions,
    ElectionResults,
    ElectionSchedule,
    ElectionTitle,
    HorizontalRuler: HorizontalRulerTheme,
    SpreadsheetAccess: SpreadsheetAccessTheme,
    ConfirmModal: ConfirmModalTheme,
    QuestionsConfirmation: QuestionsConfirmationTheme,
  } as any,
}

export * from './actions'
export * from './election'
export * from './questions'
export * from './results'
