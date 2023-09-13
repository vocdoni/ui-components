import { IconButtonProps } from '@chakra-ui/button'
import { chakra, forwardRef } from '@chakra-ui/system'
import { useClient, useElection } from '@vocdoni/react-providers'
import { ElectionStatus, areEqualHexStrings } from '@vocdoni/sdk'
import { useActions } from './ActionsProvider'

export const ActionEnd = forwardRef<IconButtonProps, 'button'>((props, ref) => {
  const { account, localize } = useClient()
  const { election } = useElection()
  const {
    end,
    loading: { end: loading },
    disabled,
  } = useActions()

  if (!election || (election && !areEqualHexStrings(election.organizationId, account?.address))) return null

  return (
    <chakra.button
      ref={ref}
      isLoading={loading}
      onClick={end}
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
