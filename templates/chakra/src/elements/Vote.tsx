import { Views } from '@vocdoni/components-voting'
import { IElection } from '@vocdoni/sdk/dist/api/election'
import { useLoaderData } from 'react-router-dom'

const Vote = () => {
  const data = (useLoaderData() as IElection)
  return <Views.Vote data={data} />
}

export default Vote
