import { ButtonGroup, IconButton } from '@chakra-ui/button'
import { ToastId, useToast } from '@chakra-ui/toast'
import { ElectionStatus } from '@vocdoni/sdk'
import { useRef } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useClient } from '../../client'
import { useElection } from './Election'

export const ElectionActions = () => {
  const toast = useToast()
  const { client, trans, account } = useClient()
  const { election } = useElection()
  const tRef = useRef<ToastId>()

  if (!election || (election && election.organizationId !== account?.address)) return null

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
    <ButtonGroup size='sm' isAttached variant='outline' position='relative'>
      <IconButton
        aria-label={trans('actions.continue')}
        title={trans('actions.continue')}
        icon={<FaPlay />}
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
        isDisabled={election.status === ElectionStatus.ONGOING}
      />
      <IconButton
        aria-label={trans('actions.pause')}
        title={trans('actions.pause')}
        icon={<FaPause />}
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
        isDisabled={election.status === ElectionStatus.PAUSED}
      />
      <IconButton
        aria-label={trans('actions.cancel')}
        title={trans('actions.cancel')}
        icon={<ImCross />}
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
      />
    </ButtonGroup>
  )
}
