import { ToastId, useToast } from '@chakra-ui/toast'
import { useClient, useElection } from '@vocdoni/react-providers'
import { useRef, useState } from 'react'

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

export const useActionsProvider = () => {
  const toast = useToast()
  const tRef = useRef<ToastId>()
  const { localize } = useClient()
  const { client, election, fetchElection } = useElection()
  const [loading, setLoading] = useState<LoadingState>(BaseLoadingState)

  const load = (key: keyof LoadingState) => setLoading((loading) => ({ ...loading, [key]: true }))

  const close = () => {
    setLoading(BaseLoadingState)
    if (tRef.current) {
      toast.close(tRef.current)
    }
  }

  const info = (description: string) => {
    tRef.current = toast({
      title: localize('actions.waiting_title'),
      description,
      isClosable: false,
      duration: null,
    })
  }

  const error = (description: string) => {
    toast({
      description,
      title: localize('actions.error_title'),
      duration: 7000,
      status: 'error',
    })
  }

  const cancel = async () => {
    if (!election) {
      throw new Error('no election in provider')
    }

    load('cancel')
    info(
      localize('actions.cancel_description', {
        election,
      })
    )

    try {
      await client.cancelElection(election.id)
      await fetchElection(election.id)
    } catch (e: any) {
      if (typeof e === 'string') {
        return error(e)
      }
      console.warn('catched error in "cancel" action', e)
    } finally {
      close()
    }
  }

  const end = async () => {
    if (!election) {
      throw new Error('no election in provider')
    }

    load('end')
    info(
      localize('actions.end_description', {
        election,
      })
    )

    try {
      await client.endElection(election.id)
      await fetchElection(election.id)
    } catch (e: any) {
      if (typeof e === 'string') {
        return error(e)
      }
      console.warn('catched error in "end" action', e)
    } finally {
      close()
    }
  }

  const pause = async () => {
    if (!election) {
      throw new Error('no election in provider')
    }

    load('pause')
    info(
      localize('actions.pause_description', {
        election,
      })
    )

    try {
      await client.pauseElection(election.id)
      await fetchElection(election.id)
    } catch (e: any) {
      if (typeof e === 'string') {
        return error(e)
      }
      console.warn('catched error in "pause" action', e)
    } finally {
      close()
    }
  }

  const resume = async () => {
    if (!election) {
      throw new Error('no election in provider')
    }

    load('continue')
    info(
      localize('actions.continue_description', {
        election,
      })
    )

    try {
      await client.continueElection(election.id)
      await fetchElection(election.id)
    } catch (e: any) {
      if (typeof e === 'string') {
        return error(e)
      }
      console.warn('catched error in "continue" action', e)
    } finally {
      close()
    }
  }

  return {
    disabled: Object.values(loading).some((value) => value === true),
    cancel,
    end,
    loading,
    pause,
    resume,
  }
}
