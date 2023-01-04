import { ViewVote } from '@vocdoni/react-voting'
import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'

const Vote = () => {
  const data = (useLoaderData() as PublishedElection)
  return <ViewVote data={data} />
}

export default Vote
