import { chakra, useMultiStyleConfig } from '@chakra-ui/react'
import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { results } from './Results'

export const VoteWeight = () => {
  const { client, election, localize } = useElection()
  const [weight, setWeight] = useState<number | null>(null)
  const styles = useMultiStyleConfig('VoteWeight')

  // Fetch the census proof for the current signer to extract the weight.
  // It uses the election provider to get the signer of the election (not the logged-in app user)
  useEffect(() => {
    ;(async () => {
      try {
        if (
          !client ||
          !election ||
          !client.wallet ||
          !(election instanceof PublishedElection) ||
          !election.census.censusId
        ) {
          return
        }

        const proof = await client.fetchProof(election.census.censusId, await client.wallet.getAddress())

        // If is token voting reduce decimals
        const decimals = (election.meta as any)?.token?.decimals || 0

        setWeight(results(Number(proof.weight), decimals))
      } catch (e) {
        console.warn('Error fetching voter weight', e)
        setWeight(null)
      }
    })()
  }, [client, election])

  if (!weight || !election || !(election instanceof PublishedElection)) return

  return (
    <chakra.div __css={styles.wrapper}>
      {localize('vote.weight')}
      <chakra.span __css={styles.weight}>{weight}</chakra.span>
    </chakra.div>
  )
}
