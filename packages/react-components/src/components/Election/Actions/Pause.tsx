import { useActions, useClient, useElection } from '../../../providers'
import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useReactComponentsLocalize } from '../../../i18n/localize'
import { useComponents } from '../../context/useComponents'

export const ActionPause = (props: ComponentPropsWithoutRef<'button'>) => {
  const { account } = useClient()
  const localize = useReactComponentsLocalize()
  const { election } = useElection()
  const { ActionPause: Slot } = useComponents()
  const {
    pause,
    disabled,
    loading: { pause: loading },
  } = useActions()

  if (
    !election ||
    !(election instanceof PublishedElection) ||
    !areEqualHexStrings(election.organizationId, account?.address)
  ) {
    return null
  }

  return (
    <Slot
      {...props}
      loading={loading}
      onClick={pause}
      disabled={disabled || election.status !== ElectionStatus.ONGOING}
      label={localize('actions.pause')}
    />
  )
}
