import { Button } from '@chakra-ui/button'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { useMultiStyleConfig } from '@chakra-ui/system'
import { useClient } from '@vocdoni/react-providers'
import { useConfirm } from './ConfirmProvider'

export const ConfirmModal = () => {
  const styles = useMultiStyleConfig('ConfirmModal')
  const { prompt, isOpen, proceed, cancel } = useConfirm()
  const { localize } = useClient()

  return (
    <Modal isOpen={isOpen} onClose={cancel!}>
      <ModalOverlay sx={styles.overlay} />
      <ModalContent sx={styles.content}>
        <ModalHeader sx={styles.header}>{localize('confirm.title')}</ModalHeader>
        <ModalCloseButton sx={styles.close} />
        <ModalBody sx={styles.body}>{prompt}</ModalBody>
        <ModalFooter sx={styles.footer}>
          <Button onClick={cancel!} variant='ghost' sx={styles.cancel}>
            {localize('confirm.cancel')}
          </Button>
          <Button onClick={proceed!} sx={styles.confirm}>
            {localize('confirm.confirm')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
