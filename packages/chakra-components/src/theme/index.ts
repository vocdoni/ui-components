import { ElectionScheduleTheme as ElectionSchedule, ElectionTitleTheme as ElectionTitle } from './election'
import { HorizontalRuler } from './layout'
import { QuestionsTheme as ElectionQuestions } from './questions'

export const theme = {
  components: {
    ElectionTitle,
    ElectionSchedule,
    HorizontalRuler,
    ElectionQuestions,
  } as any,
}

export * from './election'
export * from './questions'
