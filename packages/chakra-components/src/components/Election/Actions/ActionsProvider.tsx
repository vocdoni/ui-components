import { ActionsProvider as RActionsProvider } from '@vocdoni/react-providers'
import { PropsWithChildren, ReactElement } from 'react'
import { useActionsToast } from './use-actions-toast'

export const ActionsProvider = (props: PropsWithChildren) => {
  return (
    <RActionsProvider>
      <ChakraInternalActionsProvider {...props} />
    </RActionsProvider>
  )
}

// We need to define an "internal" component in order to be able to use the
// hooks, otherwise they wouldn't have access to the ActionsProvider context
const ChakraInternalActionsProvider = ({ children }: PropsWithChildren) => {
  useActionsToast()

  return children as ReactElement
}
