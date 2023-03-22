import { Button } from '@chakra-ui/button'
import { ChakraProps } from '@chakra-ui/system'
import { useElection } from './Election'

export type VoteButtonProps = ChakraProps & {
  label?: string
}

export const VoteButton = ({ label, ...rest }: VoteButtonProps) => {
  const { signer, loading, voting, ConnectButton } = useElection()
  const isDisabled = !signer || loading || voting

  if (!signer && ConnectButton) {
    return <ConnectButton />
  }

  return (
    <Button type='submit' {...rest} form='election-questions-form' disabled={isDisabled} isLoading={voting}>
      {label || 'Vote'}
    </Button>
  )
}
