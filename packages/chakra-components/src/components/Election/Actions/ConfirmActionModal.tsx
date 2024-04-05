import { useMultiStyleConfig } from '@chakra-ui/system'
import { useConfirm } from '../../layout'
import { useClient } from '@vocdoni/react-providers'
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/modal'
import { Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

export type ConfirmActionModalProps = {
  title: string
  description: string
}

export const ConfirmActionModal = ({ title, description, ...rest }: ConfirmActionModalProps) => {
  const mstyles = useMultiStyleConfig('ConfirmModal')
  const styles = useMultiStyleConfig('QuestionsConfirmation', rest)
  const { cancel, proceed } = useConfirm()
  const { localize } = useClient()

  return (
    <>
      <ModalHeader sx={mstyles.header}>{title}</ModalHeader>
      <ModalCloseButton sx={mstyles.close} />
      <ModalBody sx={mstyles.body}>
        <Text sx={styles.description}>{description}</Text>
      </ModalBody>
      <ModalFooter sx={mstyles.footer}>
        <Button onClick={cancel!} variant='ghost' sx={mstyles.cancel}>
          {localize('actions.cancel')}
        </Button>
        <Button onClick={proceed!} sx={mstyles.confirm}>
          {localize('actions.confirm')}
        </Button>
      </ModalFooter>
    </>
  )
}
