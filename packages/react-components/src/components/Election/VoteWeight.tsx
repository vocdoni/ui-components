import { CensusType, PublishedElection } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { up } from 'up-fetch'
import { useComponents } from '~components/context/useComponents'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useElection } from '~providers'
import { results } from './Results'

const upfetch = up(fetch)

export const VoteWeight = () => {
  const {
    client,
    election,
    csp: { token },
  } = useElection()
  const localize = useReactComponentsLocalize()
  const { VoteWeight: Slot } = useComponents()
  const [weight, setWeight] = useState<number | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        if (
          !client ||
          !election ||
          !client.wallet ||
          !(election instanceof PublishedElection) ||
          !election.census.censusId ||
          (election.census.type === CensusType.CSP && !token)
        ) {
          return
        }

        if (election.census.type !== CensusType.CSP) {
          const proof = await client.fetchProof(election.census.censusId, await client.wallet.getAddress())
          const decimals = (election.meta as any)?.token?.decimals || 0
          setWeight(results(Number(proof.weight), decimals))
        } else {
          const { weight } = await upfetch<{ weight: string }>(`${election.census.censusURI}/weight`, {
            method: 'POST',
            body: { authToken: token },
          })
          setWeight(results(Number.parseInt(weight, 16)))
        }
      } catch (error) {
        console.warn('Error fetching voter weight', error)
        setWeight(null)
      }
    })()
  }, [client, election, token])

  if (!weight || !election || !(election instanceof PublishedElection)) return null

  return <Slot label={localize('vote.weight')} weight={weight} />
}
