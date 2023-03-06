import {
  ElectionScheduleTheme as ElectionSchedule,
  ElectionTitleTheme as ElectionTitle
} from './election'
import { HorizontalRuler } from './layout'
import { QuestionsTheme as Questions } from './questions'

export const theme = {
  components: {
    ElectionTitle,
    ElectionSchedule,
    HorizontalRuler,
    Questions,
  } as any,
}

export * from './election'
export * from './questions'

