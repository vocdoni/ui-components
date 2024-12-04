import { Button, forwardRef, IconButtonProps } from '@chakra-ui/react'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus, PublishedElection } from '@vocdoni/sdk'

export const ActionPause = forwardRef<IconButtonProps, 'button'>((props, ref) => {
  const { account, localize } = useClient()
  const { election } = useElection()
  const {
    pause,
    disabled,
    loading: { pause: loading },
  } = useActions()

  if (
    !election ||
    !(election instanceof PublishedElection) ||
    !areEqualHexStrings(election.organizationId, account?.address)
  )
    return null

  return (
    <Button
      ref={ref}
      isLoading={loading}
      onClick={pause}
      isDisabled={disabled || election?.status !== ElectionStatus.ONGOING}
      children={localize('actions.pause')}
      {...props}
    />
  )
})
