import { chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { IElection as IElectionMetadata } from '@vocdoni/sdk'
import { IElection } from '@vocdoni/sdk/dist/api/election'
import { MultiLanguage } from '@vocdoni/sdk/dist/util/lang'
import { format } from 'date-fns'
import HR from '../layout/HR'
import Markdown from '../layout/Markdown'
import Questions from '../Questions'

type VoteViewProps = {
  data: IElection
  plainText?: boolean
}

const BaseViewVote = ({data, plainText}: VoteViewProps) => {
  const { metadata } : { metadata: IElectionMetadata} = (data as any)
  const styles = useMultiStyleConfig('ViewVote')

  return (
    <chakra.div __css={styles.wrapper}>
      <chakra.h1 __css={styles.title}>
        {(metadata.title as MultiLanguage<string>).default}
      </chakra.h1>
      <chakra.h2 __css={styles.date}>
        Voting period {format(new Date(data.startDate), 'd-L-y HH:mm')} ~&nbsp;
        {format(new Date(data.endDate), 'd-L-y HH:mm')}
      </chakra.h2>
      <Markdown plainText={plainText} __css={styles.description}>
        {(metadata.description as MultiLanguage<string>).default}
      </Markdown>
      <HR __css={styles.hr} />
      <Questions
        questions={metadata.questions}
        plainText={plainText}
        __css={styles.questions}
      />
    </chakra.div>
  )
}

const Vote = chakra(BaseViewVote)
Vote.displayName = 'Vote'

export default Vote
