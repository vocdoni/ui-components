import { Button } from '@chakra-ui/button'
import { useClient } from '@vocdoni/react-providers'

export const AccountSignupSigner = () => {
  const { localize } = useClient()

  return <Button>{localize('signup.signer.sign')}</Button>
}
