import { useElection } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '../context/useComponents'
import { linkifyIpfs } from '../shared/ipfs'

export const ElectionHeader = (props: ComponentPropsWithoutRef<'img'>) => {
  const { election } = useElection()
  const { ElectionHeader: Slot } = useComponents()

  if (!election || !(election instanceof PublishedElection)) return null

  return <Slot {...props} src={linkifyIpfs(election.header)} alt={election.title?.default || election.id} />
}
