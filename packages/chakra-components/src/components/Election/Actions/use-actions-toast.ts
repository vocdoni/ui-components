import { ToastId, useToast } from '@chakra-ui/react'
import { useActions } from '@vocdoni/react-providers'
import { useEffect, useRef } from 'react'

export const useActionsToast = () => {
  const tRef = useRef<ToastId>()
  const { info, error } = useActions()
  const toast = useToast()

  // show toasts for info and error
  useEffect(() => {
    if (toast && info === null && tRef.current) {
      toast.close(tRef.current)
    }
    if (info && toast) {
      tRef.current = toast({
        title: info.title,
        description: info.description,
        status: 'info',
        duration: null,
        isClosable: false,
      })
    }
    if (error && toast) {
      toast({
        title: error.title,
        description: error.description,
        status: 'error',
        duration: 7000,
        isClosable: false,
      })
    }
  }, [info, error, toast])
}
