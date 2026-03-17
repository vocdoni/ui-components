import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useElection } from '~providers'
import { getElectionTitle } from '~providers/election/normalized'

export const ElectionTitle = (props: ComponentPropsWithoutRef<'h1'> & Record<string, unknown>) => {
  const { election } = useElection()
  const { ElectionTitle: Slot } = useComponents()

  if (!election) return null

  const title = getElectionTitle(election)
  return <Slot {...props} title={title} />
}
