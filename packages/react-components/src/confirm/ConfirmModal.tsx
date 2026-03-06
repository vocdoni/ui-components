import { useConfirm } from './useConfirm'

export const ConfirmModal = () => {
  const { prompt, isOpen, cancel } = useConfirm()

  if (!isOpen) return null

  return (
    <div className='vocdoni-confirm-modal-overlay' role='presentation' onClick={() => cancel?.()}>
      <div
        className='vocdoni-confirm-modal-content'
        role='dialog'
        aria-modal='true'
        onClick={(event) => event.stopPropagation()}
      >
        {prompt}
      </div>
    </div>
  )
}
