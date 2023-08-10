import { Button } from '@chakra-ui/button'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control'
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
import { VocdoniSDKClient, dotobject } from '@vocdoni/sdk'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const SpreadsheetAccess = (rest: ChakraProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const styles = useMultiStyleConfig('SpreadsheetAccess', rest)
  const { connected, clearClient } = useElection()
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()
  const { env } = useClient()
  const { election, setClient, localize } = useElection()
  const fields: string[] = dotobject(election, 'meta.census.fields')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>()

  const onSubmit = async (vals: any) => {
    try {
      setLoading(true)
      // create wallet and client
      const wallet = walletFromRow(election!.organizationId, Object.values(vals))
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
    message: localize('required'),
  }

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
        <ModalOverlay />
        <ModalContent sx={styles.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader sx={styles.header}>{localize('spreadsheet.modal_title')}</ModalHeader>
            <ModalCloseButton isDisabled={loading} sx={styles.top_close} />
            <ModalBody sx={styles.body}>
              {fields.map((field) => (
                <FormControl key={field} isInvalid={!!errors[field]} sx={styles.control}>
                  <FormLabel sx={styles.label}>{field}</FormLabel>
                  <Input {...register(field, { required })} sx={styles.input} />
                  <FormErrorMessage sx={styles.error}>{errors[field]?.message?.toString()}</FormErrorMessage>
                </FormControl>
              ))}
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
