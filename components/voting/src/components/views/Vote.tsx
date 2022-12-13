import { Heading } from '@chakra-ui/layout'
import { IElection as IElectionMetadata } from '@vocdoni/sdk'
import { IElection } from '@vocdoni/sdk/dist/api/election'
import { MultiLanguage } from '@vocdoni/sdk/dist/util/lang'
import { format } from 'date-fns'
import HR from '../layout/HR'
import Markdown from '../layout/Markdown'
import VariantBox from '../layout/VariantBox'
import Questions from '../Questions'

type VoteViewProps = {
  data: IElection
  plainText?: boolean
}

const Vote = ({data, plainText}: VoteViewProps) => {
  console.log('received plaintext value:', plainText)
  const { metadata } : { metadata: IElectionMetadata} = (data as any)

  return (
    <VariantBox variant='voting' m={5}>
      <Heading lineHeight={1.1} mb={3} textAlign='center' as='h1'>
        {(metadata.title as MultiLanguage<string>).default}
      </Heading>
      <Heading size='sm' variant='subtitle' textAlign='center'>
        Voting period {format(new Date(data.startDate), 'd-L-y HH:mm')} ~ {format(new Date(data.endDate), 'd-L-y HH:mm')}
      </Heading>
      <Markdown plainText={plainText}>
        {(metadata.description as MultiLanguage<string>).default}
      </Markdown>
      <HR />
      <Questions
        questions={metadata.questions}
        plainText={plainText}
      />
    </VariantBox>
  )
}

export default Vote
