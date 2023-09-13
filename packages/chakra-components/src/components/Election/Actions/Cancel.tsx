import { IconButtonProps } from '@chakra-ui/button'
import { chakra, forwardRef } from '@chakra-ui/system'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, areEqualHexStrings } from '@vocdoni/sdk'
import { useActions } from './ActionsProvider'

export const ActionCancel = forwardRef<IconButtonProps, 'button'>((props, ref) => {
  const { account, localize } = useClient()
  const { election } = useElection()
  const {
    cancel,
    disabled,
    loading: { cancel: loading },
  } = useActions()

  if (!election || (election && !areEqualHexStrings(election.organizationId, account?.address))) return null

  return (
    <chakra.button
      ref={ref}
      isLoading={loading}
      onClick={cancel}
      isDisabled={
        disabled || [ElectionStatus.CANCELED, ElectionStatus.ENDED, ElectionStatus.RESULTS].includes(election.status)
      }
      children={localize('actions.cancel')}
      {...props}
    />
  )
})
