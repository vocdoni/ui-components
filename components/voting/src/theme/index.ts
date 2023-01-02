import { HorizontalRuler } from './layout'
import { QuestionsTheme as Questions } from './questions'
import { ViewVoteTheme as ViewVote } from './view-vote'

const theme = {
  components: {
    HorizontalRuler,
    Questions,
    ViewVote,
  } as any,
}

export * from './questions'
export * from './view-vote'
export default theme
