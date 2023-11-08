import { Button } from '@chakra-ui/button'
import { useClient } from '@vocdoni/react-providers'

export const AccountLoginSigner = () => {
  const { localize } = useClient()

  return <Button>{localize('login.signer.sign')}</Button>
}
