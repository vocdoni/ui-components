import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { PublishedElection } from '@vocdoni/sdk'
import { format } from 'date-fns'
import { HR, Image, Markdown } from '../layout'
import { Questions } from '../Questions'

type VoteViewProps = ChakraProps & {
  data: PublishedElection
}

const BaseViewVote = ({data, ...rest}: VoteViewProps) => {
  const styles = useMultiStyleConfig('ViewVote')

  return (
    <chakra.div __css={styles.wrapper} {...rest}>
      <Image src={data.header} sx={styles.image} />
      <chakra.h1 __css={styles.title}>
        {data.title.default}
      </chakra.h1>
      <chakra.h2 __css={styles.date}>
        Voting period {format(new Date(data.startDate), 'd-L-y HH:mm')} ~&nbsp;
        {format(new Date(data.endDate), 'd-L-y HH:mm')}
      </chakra.h2>
      <Markdown sx={styles.description}>
        {data.description.default}
      </Markdown>
      <HR sx={styles.hr} />
      <Questions
        questions={data.questions}
        sx={styles.questions}
      />
    </chakra.div>
  )
}

export const ViewVote = chakra(BaseViewVote)
ViewVote.displayName = 'Vote'
