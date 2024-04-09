import { useMultiStyleConfig } from '@chakra-ui/system'
import { useConfirm } from '../../layout'
import { useClient } from '@vocdoni/react-providers'
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/modal'
import { Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

export type ConfirmActionModalProps = {
  title: string
  description: string
  confirm?: string
  cancel?: string
}

export const ConfirmActionModal = ({ title, description, confirm, cancel, ...rest }: ConfirmActionModalProps) => {
  const mstyles = useMultiStyleConfig('ConfirmModal')
  const styles = useMultiStyleConfig('QuestionsConfirmation', rest)
  const { cancel: cancelFn, proceed } = useConfirm()
  const { localize } = useClient()

  const _confirm = confirm || localize('actions.confirm')
  const _cancel = cancel || localize('actions.cancel')

  return (
    <>
      <ModalHeader sx={mstyles.header}>{title}</ModalHeader>
      <ModalCloseButton sx={mstyles.close} />
      <ModalBody sx={mstyles.body}>
        <Text sx={styles.description}>{description}</Text>
      </ModalBody>
      <ModalFooter sx={mstyles.footer}>
        <Button onClick={cancelFn!} variant='ghost' sx={mstyles.cancel}>
          {_cancel}
        </Button>
        <Button onClick={proceed!} sx={mstyles.confirm}>
          {_confirm}
        </Button>
      </ModalFooter>
    </>
  )
}
