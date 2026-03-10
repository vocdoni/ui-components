import { PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { linkifyIpfs } from '~components/shared/ipfs'
import { useElection } from '~providers'

export const ElectionHeader = (props: ComponentPropsWithoutRef<'img'>) => {
  const { election } = useElection()
  const { ElectionHeader: Slot } = useComponents()

  if (!election || !(election instanceof PublishedElection)) return null

  return <Slot {...props} src={linkifyIpfs(election.header)} alt={election.title?.default || election.id} />
}
