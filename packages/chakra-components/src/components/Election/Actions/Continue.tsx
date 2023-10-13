import { IconButtonProps } from '@chakra-ui/button'
import { chakra, forwardRef } from '@chakra-ui/system'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus } from '@vocdoni/sdk'

export const ActionContinue = forwardRef<IconButtonProps, 'button'>((props, ref) => {
  const { account, localize } = useClient()
  const { election } = useElection()
  const {
    resume,
    disabled,
    loading: { continue: loading },
  } = useActions()

  if (!election || (election && !areEqualHexStrings(election.organizationId, account?.address))) return null

  return (
    <chakra.button
      ref={ref}
      isLoading={loading}
      onClick={resume}
      isDisabled={disabled || election.status !== ElectionStatus.PAUSED}
      children={localize('actions.continue')}
      {...props}
    />
  )
})
