import { IconButtonProps } from '@chakra-ui/button'
import { forwardRef } from '@chakra-ui/system'
import { useActions, useClient, useElection } from '@vocdoni/react-providers'
import { areEqualHexStrings, ElectionStatus } from '@vocdoni/sdk'
import { Button } from '../../layout'

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
    <Button
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
