import { useElection } from '../../providers'
import { PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '../context/useComponents'

export const ElectionTitle = (props: ComponentPropsWithoutRef<'h1'> & Record<string, unknown>) => {
  const { election } = useElection()
  const { ElectionTitle: Slot } = useComponents()

  if (!election) return null

  const title = election instanceof PublishedElection ? election.title?.default : election.id
  return <Slot {...props} title={title} />
}
