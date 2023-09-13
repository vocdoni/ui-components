import { IconButtonProps } from '@chakra-ui/button'
import { chakra, forwardRef } from '@chakra-ui/system'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, areEqualHexStrings } from '@vocdoni/sdk'
import { useActions } from './ActionsProvider'

export const ActionPause = forwardRef<IconButtonProps, 'button'>((props, ref) => {
  const { account, localize } = useClient()
  const { election } = useElection()
  const {
    pause,
    disabled,
    loading: { pause: loading },
  } = useActions()

  if (!election || (election && !areEqualHexStrings(election.organizationId, account?.address))) return null

  return (
    <chakra.button
      ref={ref}
      isLoading={loading}
      onClick={pause}
      isDisabled={disabled || election?.status !== ElectionStatus.ONGOING}
      children={localize('actions.pause')}
      {...props}
    />
  )
})
