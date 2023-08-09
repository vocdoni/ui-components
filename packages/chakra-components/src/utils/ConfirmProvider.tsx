import { PropsWithChildren, ReactNode, createContext, useContext, useState } from 'react'
import ConfirmModal from './ConfirmModal'

type ConfirmContextState = {
  prompt: null | ReactNode
  isOpen: boolean
  proceed: null | ((value: unknown) => void)
  cancel: null | VoidFunction
}

const useConfirmProvider = () => {
  const [confirm, setConfirm] = useState<ConfirmContextState>({
    prompt: null,
    isOpen: false,
    proceed: null,
    cancel: null,
  })

  return { confirm, setConfirm }
}

type ConfirmState = ReturnType<typeof useConfirmProvider>

const ConfirmContext = createContext<ConfirmState | undefined>(undefined)

export const useConfirmContext = () => {
  const ctxt = useContext(ConfirmContext)
  if (!ctxt) {
    throw new Error(
      'useConfirmContext returned `undefined`, maybe you forgot to wrap the component within <ConfirmProvider />?'
    )
  }
  return ctxt
}

const ConfirmProvider = ({ children }: PropsWithChildren<any>) => {
  const value = useConfirmProvider()
  return (
    <ConfirmContext.Provider value={value}>
      <ConfirmModal />
      {children}
    </ConfirmContext.Provider>
  )
}
export default ConfirmProvider
