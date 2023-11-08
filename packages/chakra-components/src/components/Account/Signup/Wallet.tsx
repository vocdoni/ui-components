import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { useClient } from '@vocdoni/react-providers'
import { SubmitHandler, useForm } from 'react-hook-form'

export type AccountSignupWalletFields = {
  password: string
}
export const AccountSignupWallet = () => {
  const { localize } = useClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSignupWalletFields>()

  const signup: SubmitHandler<AccountSignupWalletFields> = console.log

  return (
    <form onSubmit={handleSubmit(signup)}>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>{localize('signup.wallet.password')}</FormLabel>
        <Input {...register('password', { required: true })} />
        <FormErrorMessage>{errors.password?.message?.toString()}</FormErrorMessage>
      </FormControl>
      <Button>{localize('signup.wallet.sign')}</Button>
    </form>
  )
}
