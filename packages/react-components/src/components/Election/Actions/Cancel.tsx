import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useConfirm } from '~confirm/useConfirm'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useActions, useClient, useElection } from '~providers'
import { ConfirmActionModal } from './ConfirmActionModal'

export const ActionCancel = (props: ComponentPropsWithoutRef<'button'>) => {
  const { account } = useClient()
  const localize = useReactComponentsLocalize()
  const { confirm } = useConfirm()
  const { election } = useElection()
  const { ActionCancel: Slot } = useComponents()
  const {
    cancel,
    disabled,
    loading: { cancel: loading },
  } = useActions()

  const handle = async () => {
    if (
      await confirm(
        <ConfirmActionModal
          title={localize('confirm.cancel_process_title')}
          description={localize('actions.cancel_description', { election })}
          confirm={localize('confirm.cancel_process_button')}
          cancel={localize('confirm.cancel_button')}
        />
      )
    ) {
      await cancel()
    }
  }

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
      onClick={handle}
      disabled={
        disabled || [ElectionStatus.CANCELED, ElectionStatus.ENDED, ElectionStatus.RESULTS].includes(election.status)
      }
      label={localize('actions.cancel')}
    />
  )
}
