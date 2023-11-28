import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import { useMultiStyleConfig } from '@chakra-ui/system'
import { useConfirm } from './ConfirmProvider'

export const ConfirmModal = () => {
  const styles = useMultiStyleConfig('ConfirmModal')
  const { prompt, isOpen, cancel } = useConfirm()

  return (
    <Modal isOpen={isOpen} onClose={cancel!}>
      <ModalOverlay sx={styles.overlay} />
      <ModalContent sx={styles.content}>{prompt}</ModalContent>
    </Modal>
  )
}
