import { ReactNode } from 'react'
import { useConfirmContext } from './ConfirmProvider'

const useConfirm = () => {
  const { confirm, setConfirm } = useConfirmContext()

  const isConfirmed = (prompt: ReactNode) =>
    new Promise((resolve, reject) => {
      setConfirm({
        prompt,
        isOpen: true,
        proceed: resolve,
        cancel: reject,
      })
    }).then(
      () => {
        setConfirm({ ...confirm, isOpen: false })
        return true
      },
      () => {
        setConfirm({ ...confirm, isOpen: false })
        return false
      }
    )

  return {
    ...confirm,
    isConfirmed,
  }
}

export default useConfirm
