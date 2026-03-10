import { PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useElection } from '~providers'

export const ElectionDescription = (props: ComponentPropsWithoutRef<'div'> & Record<string, unknown>) => {
  const { election } = useElection()
  const { ElectionDescription: Slot } = useComponents()

  if (!election || !(election instanceof PublishedElection) || !election.description?.default) {
    return null
  }

  return <Slot {...props} description={election.description.default} />
}
