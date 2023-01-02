import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { ElectionMetadata } from '@vocdoni/sdk'
import { IElection } from '@vocdoni/sdk/dist/api/election'
import { MultiLanguage } from '@vocdoni/sdk/dist/util/lang'
import { format } from 'date-fns'
import HR from '../layout/HR'
import Image from '../layout/Image'
import Markdown from '../layout/Markdown'
import Questions from '../Questions'

type VoteViewProps = ChakraProps & {
  data: IElection
}

const BaseViewVote = ({data, ...rest}: VoteViewProps) => {
  const { metadata } : { metadata: ElectionMetadata} = (data as any)
  const styles = useMultiStyleConfig('ViewVote')

  return (
    <chakra.div __css={styles.wrapper} {...rest}>
      <Image src={metadata.media.header} sx={styles.image} />
      <chakra.h1 __css={styles.title}>
        {(metadata.title as MultiLanguage<string>).default}
      </chakra.h1>
      <chakra.h2 __css={styles.date}>
        Voting period {format(new Date(data.startDate), 'd-L-y HH:mm')} ~&nbsp;
        {format(new Date(data.endDate), 'd-L-y HH:mm')}
      </chakra.h2>
      <Markdown sx={styles.description}>
        {(metadata.description as MultiLanguage<string>).default}
      </Markdown>
      <HR sx={styles.hr} />
      <Questions
        questions={metadata.questions}
        sx={styles.questions}
      />
    </chakra.div>
  )
}

const Vote = chakra(BaseViewVote)
Vote.displayName = 'Vote'

export default Vote
