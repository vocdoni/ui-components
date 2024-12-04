import { Button, forwardRef, IconButtonProps } from '@chakra-ui/react'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { useConfirm } from '../../layout'
import { ConfirmActionModal } from './ConfirmActionModal'

export const ActionCancel = forwardRef<IconButtonProps, 'button'>((props, ref) => {
  const { account, localize } = useClient()
  const { confirm } = useConfirm()
  const { election } = useElection()
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
          description={localize('actions.cancel_description', {
            election,
          })}
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
    <Button
      ref={ref}
      isLoading={loading}
      onClick={handle}
      isDisabled={
        disabled || [ElectionStatus.CANCELED, ElectionStatus.ENDED, ElectionStatus.RESULTS].includes(election.status)
      }
      children={localize('actions.cancel')}
      {...props}
    />
  )
})
