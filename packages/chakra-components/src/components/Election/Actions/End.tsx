import { Button, forwardRef, IconButtonProps } from '@chakra-ui/react'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { useConfirm } from '../../layout'
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
          title={localize('confirm.end_process_title')}
          description={localize('actions.end_description', {
            election,
          })}
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
      shouldWrapChildren
      {...props}
    />
  )
})
