import { PropsWithChildren, ReactNode, createContext, useContext, useState } from 'react'
import { ConfirmModal } from './ConfirmModal'

type ConfirmContextState = {
  prompt: null | ReactNode
  isOpen: boolean
  proceed: null | ((value: unknown) => void)
  cancel: null | VoidFunction
}

const useConfirmProvider = () => {
  const [state, setState] = useState<ConfirmContextState>({
    prompt: null,
    isOpen: false,
    proceed: null,
    cancel: null,
  })

  const confirm = (prompt: ReactNode) =>
    new Promise((resolve, reject) => {
      setState({
        prompt,
        isOpen: true,
        proceed: resolve,
        cancel: reject,
      })
    }).then(
      () => {
        setState({ ...state, isOpen: false })
        return true
      },
      () => {
        setState({ ...state, isOpen: false })
        return false
      }
    )

  return { ...state, confirm }
}

type ConfirmState = ReturnType<typeof useConfirmProvider>

const ConfirmContext = createContext<ConfirmState | undefined>(undefined)

export const useConfirm = () => {
  const ctxt = useContext(ConfirmContext)
  if (!ctxt) {
    throw new Error(
      'useConfirm returned `undefined`, maybe you forgot to wrap the component within <ConfirmProvider />?'
    )
  }
  return ctxt
}

export const ConfirmProvider = ({ children }: PropsWithChildren<any>) => {
  const value = useConfirmProvider()
  return (
    <ConfirmContext.Provider value={value}>
      <ConfirmModal />
      {children}
    </ConfirmContext.Provider>
  )
}
