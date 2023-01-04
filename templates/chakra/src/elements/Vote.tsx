import { ViewVote } from '@vocdoni/react-voting'
import { IElection } from '@vocdoni/sdk/dist/api/election'
import { useLoaderData } from 'react-router-dom'

const Vote = () => {
  const data = (useLoaderData() as IElection)
  return <ViewVote data={data} />
}

export default Vote
