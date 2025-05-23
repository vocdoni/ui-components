import {
  Button,
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useMultiStyleConfig,
  useToast,
} from '@chakra-ui/react'
import { Wallet } from '@ethersproject/wallet'
import { errorToString, useClient, useElection, walletFromRow } from '@vocdoni/react-providers'
import { PublishedElection, VocdoniSDKClient } from '@vocdoni/sdk'
import { useEffect, useState } from 'react'
import { RegisterOptions, useForm } from 'react-hook-form'

type MetaSpecs = {
  [name: string]: {
    type?:
      | 'checkbox'
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'month'
      | 'number'
      | 'password'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week'
    pattern?: {
      value: string
      message: string
    }
    description?: string
    props?: any
  }
}

export type SpreadsheetAccessProps = ChakraProps & {
  hashPrivateKey?: boolean
}

export const SpreadsheetAccess = ({ hashPrivateKey, ...rest }: SpreadsheetAccessProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const styles = useMultiStyleConfig('SpreadsheetAccess', rest)
  const { connected, clearClient } = useElection()
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const { env } = useClient()
  const {
    election,
    client: cl,
    setClient,
    localize,
    sikPassword,
    sikSignature,
    loading: { voting },
  } = useElection()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>()

  const shouldRender = election instanceof PublishedElection && election?.get('census.type') === 'spreadsheet'
  const privkey = window.location.hash ? window.location.hash.split('#')[1] : ''

  // In case of spreadsheet census and a private provided through the URI, do intent to login automatically
  // Example url with private key:
  // https://app.vocdoni.io/processes/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef#0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
  useEffect(() => {
    ;(async () => {
      try {
        if (!shouldRender || !privkey) return
        const privKeyWallet = new Wallet(privkey)
        let client = new VocdoniSDKClient({
          env,
          wallet: privKeyWallet,
          electionId: election?.id,
        })
        setClient(client)
      } catch (error) {
        console.warn('Error trying to login with private key ', error)
        // this should not be required... if it fails, the client should already be the one set
        setClient(cl)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [election, env, shouldRender, privkey])

  // we return as soon as possible to avoid type issues with the following methods
  if (!shouldRender) return null

  const onSubmit = async (vals: any) => {
    try {
      setLoading(true)

      // grab sik passworrd if anon election
      let sikp: null | string = null
      if (election?.electionType.anonymous) {
        sikp = vals.sik_password
        delete vals.sik_password
      }

      // create wallet and client
      const hid = await cl.electionService.getNumericElectionId(election!.id)
      const salt =
        election.get('census.salt') || (await cl.electionService.getElectionSalt(election!.organizationId, hid))
      const wallet = walletFromRow(salt, Object.values(vals))
      const client = new VocdoniSDKClient({
        env,
        wallet,
        electionId: election?.id,
      })
      // check if is in census
      if (!(await client.isInCensus())) {
        return toast({
          status: 'error',
          title: localize('errors.wrong_data_title'),
          description: localize('errors.wrong_data_description'),
        })
      }
      // store SIK requirements to client on anon elections
      if (election?.electionType.anonymous && sikp) {
        const signature = await client.anonymousService.signSIKPayload(wallet)
        const sik = await client.anonymousService.fetchAccountSIK(wallet.address).catch(() => false)
        const valid = await client.anonymousService.hasRegisteredSIK(wallet.address, signature, sikp)

        if (sik && !valid) {
          return toast({
            status: 'error',
            title: localize('errors.wrong_data_title'),
            description: localize('errors.wrong_data_description'),
          })
        }
        sikPassword(sikp)
        sikSignature(signature)
      }
      // in case of success, set current client
      setClient(client)
      if (hashPrivateKey) {
        document.location.hash = wallet.privateKey
      }
      // reset the form
      reset()
      // also, close the modal
      onClose()
    } catch (e) {
      toast({
        status: 'error',
        description: errorToString(e),
      })
    } finally {
      setLoading(false)
    }
  }

  // Form fields
  const fields: string[] = election.get('census.fields')
  // Validation rules
  const required = {
    value: true,
    message: localize('validation.required'),
  }
  const minLength = {
    value: 8,
    message: localize('validation.min_length', { min: 8 }),
  }
  // Validations provided by the election metadata
  const specs: MetaSpecs = election?.get('census.specs')
  // form specs
  const fspecs = (field: string) => {
    if (!specs || typeof specs[field] === 'undefined') return
    const f = specs[field]
    const props: RegisterOptions<any, string> = {}

    if (f.pattern) {
      props.pattern = {
        value: new RegExp(f.pattern.value),
        message: f.pattern.message,
      }
    }

    if (f.props) {
      if (f.props.max) {
        props.max = f.props.max
      }
      if (f.props.min) {
        props.min = f.props.min
      }
    }

    return props
  }
  // input specs
  const ispecs = (field: string) => {
    if (!specs || typeof specs[field] === 'undefined') return
    const f = specs[field]
    const props: InputProps = f.props || {}
    if (f.type) {
      props.type = f.type
    }

    return props
  }
  // input helper text
  const description = (field: string) => {
    if (!specs || typeof specs[field] === 'undefined') return
    return specs[field].description
  }

  const logout = () => {
    window.history.pushState({}, '', document.location.pathname) // Remove the PK after the hash
    clearClient()
  }

  if (connected) {
    return (
      <Button onClick={logout} sx={styles.disconnect} isDisabled={voting}>
        {localize('spreadsheet.logout')}
      </Button>
    )
  }

  return (
    <>
      <Button onClick={onOpen} sx={styles.button}>
        {localize('spreadsheet.access_button')}
      </Button>
      <Modal isOpen={isOpen} onClose={() => !loading && onClose()}>
        <ModalOverlay sx={styles.overlay} />
        <ModalContent sx={styles.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader sx={styles.header}>{localize('spreadsheet.modal_title')}</ModalHeader>
            <ModalCloseButton isDisabled={loading} sx={styles.top_close} />
            <ModalBody sx={styles.body}>
              {fields.map((field, key) => (
                <FormControl key={key} isInvalid={!!errors[key]} sx={styles.control}>
                  <FormLabel sx={styles.label}>{field}</FormLabel>
                  <Input
                    {...register(key.toString(), {
                      required,
                      ...fspecs(field),
                    })}
                    sx={styles.input}
                    {...ispecs(field)}
                  />
                  {!!errors[key]?.message ? (
                    <FormErrorMessage sx={styles.error}>{errors[key]?.message?.toString()}</FormErrorMessage>
                  ) : (
                    description(field) && <FormHelperText>{description(field)}</FormHelperText>
                  )}
                </FormControl>
              ))}
              {election?.electionType.anonymous && (
                <FormControl isInvalid={!!errors.sik_password} sx={styles.sik_control}>
                  <FormLabel sx={styles.label}>{localize('spreadsheet.anon_sik_label')}</FormLabel>
                  <Input {...register('sik_password', { required, minLength })} type='password' sx={styles.input} />
                  {!!errors.sik_password ? (
                    <FormErrorMessage sx={styles.error}>{errors.sik_password?.message?.toString()}</FormErrorMessage>
                  ) : (
                    <FormHelperText sx={styles.helper}>{localize('spreadsheet.anon_sik_helper')}</FormHelperText>
                  )}
                </FormControl>
              )}
            </ModalBody>
            <ModalFooter sx={styles.footer}>
              <Button variant='ghost' mr={3} onClick={onClose} sx={styles.close} isDisabled={loading}>
                {localize('spreadsheet.close')}
              </Button>
              <Button shouldWrapChildren type='submit' sx={styles.submit} isLoading={loading}>
                {localize('spreadsheet.access_button')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
