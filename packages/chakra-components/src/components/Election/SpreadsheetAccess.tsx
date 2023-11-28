import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { useDisclosure } from '@chakra-ui/react-use-disclosure'
import { ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useToast } from '@chakra-ui/toast'
import { errorToString, useClient, useElection, walletFromRow } from '@vocdoni/react-providers'
import { ArchivedElection, dotobject, VocdoniSDKClient } from '@vocdoni/sdk'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const SpreadsheetAccess = (rest: ChakraProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const styles = useMultiStyleConfig('SpreadsheetAccess', rest)
  const { connected, clearClient } = useElection()
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const { env, client: cl } = useClient()
  const { election, setClient, localize, fetchCensus, sikPassword, sikSignature } = useElection()
  const fields: string[] = dotobject(election, 'meta.census.fields')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>()

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
      const salt = await cl.electionService.getElectionSalt(election!.organizationId, hid)
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
      // use provider method to set related census state info
      fetchCensus()
      // store SIK requirements to client on anon elections
      if (election?.electionType.anonymous && sikp) {
        sikPassword(sikp)
        sikSignature(await client.anonymousService.signSIKPayload(wallet))
      }
      // in case of success, set current client
      setClient(client)
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

  const required = {
    value: true,
    message: localize('validation.required'),
  }
  const minLength = {
    value: 8,
    message: localize('validation.min_length', { min: 8 }),
  }

  if (election?.get('census.type') !== 'spreadsheet' || election instanceof ArchivedElection) return null

  if (connected) {
    return (
      <Button onClick={clearClient} sx={styles.disconnect}>
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
                  <Input {...register(key.toString(), { required })} sx={styles.input} />
                  <FormErrorMessage sx={styles.error}>{errors[key]?.message?.toString()}</FormErrorMessage>
                </FormControl>
              ))}
              {election.electionType.anonymous && (
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
              <Button type='submit' sx={styles.submit} isLoading={loading}>
                {localize('spreadsheet.access_button')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
