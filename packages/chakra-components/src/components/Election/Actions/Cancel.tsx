import { IconButtonProps } from '@chakra-ui/button'
import { forwardRef } from '@chakra-ui/system'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus } from '@vocdoni/sdk'
import { Button, useConfirm } from '../../layout'
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
          title={localize('actions.confirm_cancel_title')}
          description={localize('actions.cancel_description', {
            election,
          })}
          confirm={localize('actions.confirm_cancel_cta')}
        />
      )
    ) {
      await cancel()
    }
  }

  if (!election || (election && !areEqualHexStrings(election.organizationId, account?.address))) return null

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
