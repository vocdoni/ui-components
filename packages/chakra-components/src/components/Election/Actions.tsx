import { ButtonGroup, IconButton } from '@chakra-ui/button'
import { ChakraProps, chakra, useMultiStyleConfig } from '@chakra-ui/system'
import { ToastId, useToast } from '@chakra-ui/toast'
import { ElectionStatus, areEqualHexStrings } from '@vocdoni/sdk'
import { useRef, useState } from 'react'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useClient } from '../../client'
import { useElection } from './Election'

const PlayIcon = chakra(FaPlay)
const PauseIcon = chakra(FaPause)
const CancelIcon = chakra(ImCross)
const StopIcon = chakra(FaStop)

type LoadingState = {
  continue: boolean
  pause: boolean
  end: boolean
  cancel: boolean
}

const BaseLoadingState: LoadingState = {
  continue: false,
  pause: false,
  end: false,
  cancel: false,
}

export const ElectionActions = (props: ChakraProps) => {
  const toast = useToast()
  const { localize, account } = useClient()
  const { client, election, fetchElection } = useElection()
  const tRef = useRef<ToastId>()
  const styles = useMultiStyleConfig('ElectionActions')
  const [loading, setLoading] = useState<LoadingState>(BaseLoadingState)

  if (!election || (election && !areEqualHexStrings(election.organizationId, account?.address))) return null

  const closeToast = () => {
    setLoading(BaseLoadingState)
    if (tRef.current) {
      toast.close(tRef.current)
    }
  }

  const load = (key: keyof LoadingState) => setLoading((loading) => ({ ...loading, [key]: true }))

  const infoToast = (description: string) => {
    tRef.current = toast({
      title: localize('actions.waiting_title'),
      description,
      isClosable: false,
      duration: null,
    })
  }

  const errorToast = (description: string) => {
    toast({
      description,
      title: localize('actions.error_title'),
      duration: 7000,
      status: 'error',
    })
  }

  return (
    <ButtonGroup size='sm' isAttached variant='outline' position='relative' sx={styles.group} {...props}>
      <IconButton
        aria-label={localize('actions.continue')}
        title={localize('actions.continue')}
        icon={<PlayIcon sx={styles.icons} />}
        isLoading={loading.continue}
        onClick={async () => {
          load('continue')
          infoToast(
            localize('actions.continue_description', {
              election,
            })
          )

          try {
            await client.continueElection(election.id)
            await fetchElection(election.id)
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
        aria-label={localize('actions.pause')}
        title={localize('actions.pause')}
        icon={<PauseIcon sx={styles.icons} />}
        isLoading={loading.pause}
        onClick={async () => {
          load('pause')
          infoToast(
            localize('actions.pause_description', {
              election,
            })
          )

          try {
            await client.pauseElection(election.id)
            await fetchElection(election.id)
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
        aria-label={localize('actions.end')}
        title={localize('actions.end')}
        icon={<StopIcon sx={styles.icons} />}
        isLoading={loading.end}
        onClick={async () => {
          load('end')
          infoToast(
            localize('actions.end_description', {
              election,
            })
          )

          try {
            await client.endElection(election.id)
            await fetchElection(election.id)
          } catch (e: any) {
            if (typeof e === 'string') {
              return errorToast(e)
            }
            console.warn('catched error in "end" action', e)
          } finally {
            closeToast()
          }
        }}
        isDisabled={election.status !== ElectionStatus.ONGOING}
        sx={styles.buttons}
      />
      <IconButton
        aria-label={localize('actions.cancel')}
        title={localize('actions.cancel')}
        icon={<CancelIcon sx={styles.icons} />}
        isLoading={loading.cancel}
        onClick={async () => {
          load('cancel')
          infoToast(
            localize('actions.cancel_description', {
              election,
            })
          )

          try {
            await client.cancelElection(election.id)
            await fetchElection(election.id)
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
