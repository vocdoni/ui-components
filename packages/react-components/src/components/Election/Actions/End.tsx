import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef } from 'react'
import { useConfirm } from '../../../confirm/useConfirm'
import { useReactComponentsLocalize } from '../../../i18n/localize'
import { useComponents } from '../../context/useComponents'
import { ConfirmActionModal } from './ConfirmActionModal'

export const ActionEnd = (props: ComponentPropsWithoutRef<'button'>) => {
  const { account } = useClient()
  const localize = useReactComponentsLocalize()
  const { confirm } = useConfirm()
  const { election } = useElection()
  const { ActionEnd: Slot } = useComponents()
  const {
    end,
    loading: { end: loading },
    disabled,
  } = useActions()

  const handle = async () => {
    if (
      await confirm(
        <ConfirmActionModal
          title={localize('confirm.end_process_title')}
          description={localize('actions.end_description', { election })}
          confirm={localize('confirm.end_process_button')}
          cancel={localize('confirm.cancel_button')}
        />
      )
    ) {
      await end()
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
        disabled ||
        [ElectionStatus.RESULTS, ElectionStatus.ENDED, ElectionStatus.CANCELED, ElectionStatus.UPCOMING].includes(
          election.status
        )
      }
      label={localize('actions.end')}
    />
  )
}
