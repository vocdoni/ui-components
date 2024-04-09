import { IconButtonProps } from '@chakra-ui/button'
import { forwardRef } from '@chakra-ui/system'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus } from '@vocdoni/sdk'
import { Button, useConfirm } from '../../layout'
import { ConfirmActionModal } from './ConfirmActionModal'

export const ActionEnd = forwardRef<IconButtonProps, 'button'>((props, ref) => {
  const { account, localize } = useClient()
  const { confirm } = useConfirm()
  const { election } = useElection()
  const {
    end,
    loading: { end: loading },
    disabled,
  } = useActions()

  const handle = async () => {
    if (
      await confirm(
        <ConfirmActionModal
          title={localize('actions.confirm_end_title')}
          description={localize('actions.end_description', {
            election,
          })}
          confirm={localize('actions.confirm_end_cta')}
          cancel={localize('actions.cancel_cta')}
        />
      )
    ) {
      await end()
    }
  }

  if (!election || (election && !areEqualHexStrings(election.organizationId, account?.address))) return null

  return (
    <Button
      ref={ref}
      isLoading={loading}
      onClick={handle}
      isDisabled={
        disabled ||
        [ElectionStatus.RESULTS, ElectionStatus.ENDED, ElectionStatus.CANCELED, ElectionStatus.UPCOMING].includes(
          election.status
        )
      }
      children={localize('actions.end')}
      {...props}
    />
  )
})
