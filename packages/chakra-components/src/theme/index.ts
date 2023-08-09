import { ElectionScheduleTheme as ElectionSchedule, ElectionTitleTheme as ElectionTitle } from './election'
import { HorizontalRuler } from './layout'
import { QuestionsTheme as ElectionQuestions } from './questions'
import { ResultsTheme as ElectionResults } from './results'
import { SpreadsheetAccessTheme } from './spreadsheet'

export const theme = {
  components: {
    ElectionQuestions,
    ElectionResults,
    ElectionSchedule,
    ElectionTitle,
    HorizontalRuler,
    SpreadsheetAccess: SpreadsheetAccessTheme,
  } as any,
}

export * from './actions'
export * from './election'
export * from './questions'
export * from './results'
