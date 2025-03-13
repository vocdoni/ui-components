import { CensusType, CspProofType, CspVote, PublishedElection, VocdoniSDKClient, Vote } from '@vocdoni/sdk'
import { up } from 'up-fetch'

const f = up(fetch)

export const vote = async (client: VocdoniSDKClient, election: PublishedElection, token: string, vote: Vote) => {
  if (!client) {
    throw new Error('no client initialized')
  }
  if (!(election instanceof PublishedElection) || election?.census?.type !== CensusType.CSP) {
    throw new Error('not a CSP election')
  }

  const walletAddress: string = (await client.wallet?.getAddress()) as string
  const signature: { signature: string } = await f(`${election.census.censusURI}/sign`, {
    method: 'POST',
    body: {
      payload: walletAddress,
      authToken: token,
      electionId: election.id,
    },
  })
  const cspVote: CspVote = client.cspVote(vote, signature.signature, CspProofType.ECDSA_PIDSALTED)
  const vid: string = await client.submitVote(cspVote)

  return vid
}
