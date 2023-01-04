import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ViewVote } from '@vocdoni/react-voting'
import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'
import { useSigner } from 'wagmi'

import '@rainbow-me/rainbowkit/styles.css'

const Vote = () => {
  const { data: signer } = useSigner()
  const election = (useLoaderData() as PublishedElection)

  return (
    <>
      <ViewVote
        election={election}
        signer={signer}
        ConnectButton={ConnectButton}
      />
    </>
  )
}

export default Vote
