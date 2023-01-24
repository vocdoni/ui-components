import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { format } from 'date-fns'
import { Questions, QuestionsProviderProps } from '..'
import { HR, Image, Markdown } from '../layout'

type VoteViewProps = ChakraProps & QuestionsProviderProps

const BaseViewVote = ({election, signer, ConnectButton, ...rest}: VoteViewProps) => {
  const styles = useMultiStyleConfig('ViewVote')

  return (
    <chakra.div __css={styles.wrapper} {...rest}>
      <Image src={election.header} sx={styles.image} />
      <chakra.h1 __css={styles.title}>
        {election.title.default}
      </chakra.h1>
      <chakra.h2 __css={styles.date}>
        Voting period {format(new Date(election.startDate), 'd-L-y HH:mm')} ~&nbsp;
        {format(new Date(election.endDate), 'd-L-y HH:mm')}
      </chakra.h2>
      <Markdown sx={styles.description}>
        {election.description.default}
      </Markdown>
      <HR sx={styles.hr} />
      <Questions
        election={election}
        signer={signer}
        ConnectButton={ConnectButton}
        // sx={styles.questions}
      />
    </chakra.div>
  )
}

export const ViewVote = chakra(BaseViewVote)
ViewVote.displayName = 'Vote'
