import { PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useElection } from '~providers'

export const ElectionTitle = (props: ComponentPropsWithoutRef<'h1'> & Record<string, unknown>) => {
  const { election } = useElection()
  const { ElectionTitle: Slot } = useComponents()

  if (!election) return null

  const title = election instanceof PublishedElection ? election.title?.default : election.id
  return <Slot {...props} title={title} />
}
