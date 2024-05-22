import { IconButtonProps } from '@chakra-ui/button'
import { forwardRef } from '@chakra-ui/system'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'
import { Button } from '../../layout'

export const ActionContinue = forwardRef<IconButtonProps, 'button'>((props, ref) => {
  const { account, localize } = useClient()
  const { election } = useElection()
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
    <Button
      ref={ref}
      isLoading={loading}
      onClick={resume}
      isDisabled={disabled || election.status !== ElectionStatus.PAUSED}
      children={localize('actions.continue')}
      {...props}
    />
  )
})
