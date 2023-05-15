import { ButtonGroup, IconButton } from '@chakra-ui/button'
import { ChakraProps, chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { ToastId, useToast } from '@chakra-ui/toast'
import { ElectionStatus } from '@vocdoni/sdk'
import { useRef } from 'react'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useClient } from '../../client'
import { areEqualHexStrings } from '../../utils'
import { useElection } from './Election'

const PlayIcon = chakra(FaPlay)
const PauseIcon = chakra(FaPause)
const CancelIcon = chakra(ImCross)
const StopIcon = chakra(FaStop)

export const ElectionActions = (props: ChakraProps) => {
  const toast = useToast()
  const { client, trans, account } = useClient()
  const { election } = useElection()
  const tRef = useRef<ToastId>()
  const styles = useMultiStyleConfig('ElectionActions')

  if (!election || (election && !areEqualHexStrings(election.organizationId, account?.address))) return null

  const closeToast = () => {
    if (tRef.current) {
      toast.close(tRef.current)
    }
  }

  const infoToast = (description: string) => {
    tRef.current = toast({
      title: trans('actions.waiting_title'),
      description,
      isClosable: false,
      duration: null,
    })
  }

  const errorToast = (description: string) => {
    toast({
      description,
      title: trans('actions.error_title'),
      duration: 7000,
      status: 'error',
    })
  }

  return (
    <ButtonGroup size='sm' isAttached variant='outline' position='relative' sx={styles.group} {...props}>
      <IconButton
        aria-label={trans('actions.continue')}
        title={trans('actions.continue')}
        icon={<PlayIcon sx={styles.icons} />}
        onClick={async () => {
          infoToast(
            trans('actions.continue_description', {
              election,
            })
          )

          try {
            await client.continueElection(election.id)
          } catch (e: any) {
            if (typeof e === 'string') {
              return errorToast(e)
            }
            console.warn('catched error in "continue" action', e)
          } finally {
            closeToast()
          }
        }}
        isDisabled={[ElectionStatus.ONGOING, ElectionStatus.CANCELED].includes(election.status)}
        sx={styles.buttons}
      />
      <IconButton
        aria-label={trans('actions.pause')}
        title={trans('actions.pause')}
        icon={<PauseIcon sx={styles.icons} />}
        onClick={async () => {
          infoToast(
            trans('actions.pause_description', {
              election,
            })
          )

          try {
            await client.pauseElection(election.id)
          } catch (e: any) {
            if (typeof e === 'string') {
              return errorToast(e)
            }
            console.warn('catched error in "pause" action', e)
          } finally {
            closeToast()
          }
        }}
        isDisabled={[ElectionStatus.PAUSED, ElectionStatus.CANCELED].includes(election.status)}
        sx={styles.buttons}
      />
      <IconButton
        aria-label={trans('actions.end')}
        title={trans('actions.end')}
        icon={<StopIcon sx={styles.icons} />}
        onClick={async () => {
          infoToast(
            trans('actions.end_description', {
              election,
            })
          )

          try {
            await client.endElection(election.id)
          } catch (e: any) {
            if (typeof e === 'string') {
              return errorToast(e)
            }
            console.warn('catched error in "pause" action', e)
          } finally {
            closeToast()
          }
        }}
        isDisabled={election.status !== ElectionStatus.ONGOING}
        sx={styles.buttons}
      />
      <IconButton
        aria-label={trans('actions.cancel')}
        title={trans('actions.cancel')}
        icon={<CancelIcon sx={styles.icons} />}
        onClick={async () => {
          infoToast(
            trans('actions.cancel_description', {
              election,
            })
          )

          try {
            await client.cancelElection(election.id)
          } catch (e: any) {
            if (typeof e === 'string') {
              return errorToast(e)
            }
            console.warn('catched error in "cancel" action', e)
          } finally {
            closeToast()
          }
        }}
        isDisabled={election.status === ElectionStatus.CANCELED}
        sx={styles.buttons}
      />
    </ButtonGroup>
  )
}
