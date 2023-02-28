import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Election } from '@vocdoni/react-components'
import { useLoaderData } from 'react-router-dom'

import '@rainbow-me/rainbowkit/styles.css'

const Vote = () => {
  // we take the election from the route information for a better rendering experience
  const election = (useLoaderData() as PublishedElection)
  /*
    you could comment the above line and uncomment the ones below to use the
    ElectionProvider to fetch the election instead, but the usage of useLoaderData
    is recommended
  */
  // const { pid } = useParams()

  return (
    <Election
      // id={pid}
      election={election}
      ConnectButton={ConnectButton}
    />
  )
}

export default Vote
