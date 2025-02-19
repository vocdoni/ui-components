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
import { QuestionChoiceAnatomyRecord } from '../../../theme/question-choice'

export type QuestionChoiceMeta = {
  image: {
    default: string
    thumbnail?: string
  }
  description?: {
    default: string
    [lang: string]: string
  }
}

export const QuestionChoice = ({ choice, ...rest }: { choice: IChoice } & StackProps) => {
  const styles = useMultiStyleConfig('QuestionChoice') as QuestionChoiceAnatomyRecord
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loaded, setLoaded] = useState(false)
  const [loadedModal, setLoadedModal] = useState(false)

  const label = choice.title.default
  const { image, description } = ((choice as any)?.meta ?? {}) as QuestionChoiceMeta
  const renderImage = !!image.default
  const renderModal = image.default && image.thumbnail

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
              {description && <Text sx={styles.modalDescription}>{description.default}</Text>}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Stack>
  )
}
