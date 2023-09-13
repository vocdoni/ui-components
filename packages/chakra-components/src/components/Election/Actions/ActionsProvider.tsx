import { PropsWithChildren, createContext, useContext } from 'react'
import { useActionsProvider } from './use-actions-provider'

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

export type ActionsProviderComponentProps = PropsWithChildren

export const ActionsProvider = ({ children }: ActionsProviderComponentProps) => {
  const value = useActionsProvider()

  return <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
}

ActionsProvider.displayName = 'ActionsProvider'
