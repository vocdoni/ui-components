import { HorizontalRuler } from './layout'
import { QuestionsTheme as Questions } from './questions'
import { ViewVoteTheme as ViewVote } from './view-vote'

export const theme = {
  components: {
    HorizontalRuler,
    Questions,
    ViewVote,
  } as any,
}

export * from './questions'
export * from './view-vote'
