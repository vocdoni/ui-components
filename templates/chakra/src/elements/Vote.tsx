import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Election } from '@vocdoni/react-components'
import { ElectionStatus } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import { useSigner } from 'wagmi'

import '@rainbow-me/rainbowkit/styles.css'

const Vote = () => {
  const { data: signer } = useSigner()
  const election = (useLoaderData() as PublishedElection)
  // const { pid } = useParams()

  return (
    <Election
      // id={pid}
      election={election}
      signer={signer}
      ConnectButton={ConnectButton}
    />
  )
}

export default Vote
