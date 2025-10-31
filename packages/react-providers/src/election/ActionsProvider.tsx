import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { useElection } from '.'
import { useClient } from '../client'

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

export type ActionsStatusMessage = {
  title: string
  description?: string
}

export const useActionsProvider = () => {
  const { localize } = useClient()
  const { client, election, fetchElection } = useElection()
  const [loading, setLoading] = useState<LoadingState>(BaseLoadingState)
  const [error, setError] = useState<ActionsStatusMessage | null>(null)
  const [info, setInfo] = useState<ActionsStatusMessage | null>(null)

  const load = (key: keyof LoadingState) => setLoading((loading) => ({ ...loading, [key]: true }))

  const close = () => {
    setLoading(BaseLoadingState)
    setInfo(null)
  }

  const infostate = (description: string) => {
    setInfo({
      title: localize('actions.waiting_title'),
      description,
    })
  }

  const errorstate = (description: string) => {
    setError({
      title: localize('actions.error_title'),
      description,
    })
  }

  const cancel = async () => {
    if (!election) {
      throw new Error('no election in provider')
    }

    load('cancel')
    infostate(
      localize('actions.cancel_description', {
        election,
      })
    )

    try {
      await client.cancelElection(election.id)
      await fetchElection(election.id)
    } catch (e: any) {
      if (typeof e === 'string') {
        return errorstate(e)
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
    infostate(
      localize('actions.end_description', {
        election,
      })
    )

    try {
      await client.endElection(election.id)
      await fetchElection(election.id)
    } catch (e: any) {
      if (typeof e === 'string') {
        return errorstate(e)
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
    infostate(
      localize('actions.pause_description', {
        election,
      })
    )

    try {
      await client.pauseElection(election.id)
      await fetchElection(election.id)
    } catch (e: any) {
      if (typeof e === 'string') {
        return errorstate(e)
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
    infostate(
      localize('actions.continue_description', {
        election,
      })
    )

    try {
      await client.continueElection(election.id)
      await fetchElection(election.id)
    } catch (e: any) {
      if (typeof e === 'string') {
        return errorstate(e)
      }
      console.warn('catched error in "continue" action', e)
    } finally {
      close()
    }
  }

  const disabled = Object.values(loading).some((value) => value === true)

  // clear errors when election or loading status change
  useEffect(() => {
    if (election && !disabled) {
      setError(null)
    }
  }, [disabled, election])

  return {
    disabled,
    cancel,
    end,
    error,
    info,
    loading,
    pause,
    resume,
  }
}

export type ActionsState = ReturnType<typeof useActionsProvider>

export const ActionsContext = createContext<ActionsState | undefined>(undefined)

export const useActions = () => {
  const ctxt = useContext(ActionsContext)
  if (!ctxt) {
    throw new Error(
      'useActions returned `undefined`, maybe you forgot to wrap the component within <ActionsProvider />?'
    )
  }

  return ctxt
}

export const ActionsProvider = (props: PropsWithChildren) => {
  const value = useActionsProvider()

  return <ActionsContext.Provider value={value} {...props} />
}

ActionsProvider.displayName = 'ActionsProvider'
