import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useActions, useClient, useElection } from '~providers'

export const ActionContinue = (props: ComponentPropsWithoutRef<'button'>) => {
  const { account } = useClient()
  const localize = useReactComponentsLocalize()
  const { election } = useElection()
  const { ActionContinue: Slot } = useComponents()
  const {
    resume,
    disabled,
    loading: { continue: loading },
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
      onClick={resume}
      disabled={disabled || election.status !== ElectionStatus.PAUSED}
      label={localize('actions.continue')}
    />
  )
}
