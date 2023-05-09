import { ElectionScheduleTheme as ElectionSchedule, ElectionTitleTheme as ElectionTitle } from './election'
import { HorizontalRuler } from './layout'
import { QuestionsTheme as ElectionQuestions } from './questions'
import { ResultsTheme as ElectionResults } from './results'

export const theme = {
  components: {
    ElectionQuestions,
    ElectionResults,
    ElectionSchedule,
    ElectionTitle,
    HorizontalRuler,
  } as any,
}

export * from './election'
export * from './questions'
export * from './results'
