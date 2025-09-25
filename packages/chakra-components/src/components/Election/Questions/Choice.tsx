import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { IChoice } from '@vocdoni/sdk'
import { useState } from 'react'
import { Markdown } from '../../layout'

export type QuestionChoiceMeta = {
  image: {
    default: string
    thumbnail?: string
  }
  description?: string
}

export const QuestionChoice = ({ choice, ...rest }: { choice: IChoice } & StackProps) => {
  const styles = useMultiStyleConfig('QuestionChoice')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loaded, setLoaded] = useState(false)
  const [loadedModal, setLoadedModal] = useState(false)

  const label = choice.title.default
  const { image, description } = (choice.meta ?? {}) as QuestionChoiceMeta
  const renderImage = !!image && !!image.default
  const renderModal = !!image && image.default && image.thumbnail

  return (
    <Stack sx={styles.wrapper} {...rest}>
      {renderImage && (
        <Skeleton isLoaded={loaded} sx={styles.skeleton}>
          <Image
            onClick={(e) => {
              if (!renderModal) return
              e.preventDefault()
              onOpen()
            }}
            sx={styles.image}
            src={image.thumbnail ?? image.default}
            alt={label}
            onLoad={() => setLoaded(true)}
          />
        </Skeleton>
      )}
      <Text sx={styles.label}>{label}</Text>
      {description && <Markdown sx={styles.description}>{description}</Markdown>}
      {renderModal && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay sx={styles.modalOverlay} />
          <ModalContent sx={styles.modalContent}>
            <ModalCloseButton sx={styles.modalClose} />
            <ModalBody sx={styles.modalBody}>
              {renderImage && (
                <Skeleton isLoaded={loadedModal} sx={styles.skeletonModal}>
                  <Image src={image.default} alt={label} sx={styles.modalImage} onLoad={() => setLoadedModal(true)} />
                </Skeleton>
              )}
              <Text sx={styles.modalLabel}>{label}</Text>
              {description && <Markdown sx={styles.modalDescription}>{description}</Markdown>}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Stack>
  )
}
