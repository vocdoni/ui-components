import { ComponentPropsWithoutRef } from 'react'
import { useConfirm } from '../../../confirm/useConfirm'
import { useComponents } from '../../context/useComponents'

export type ConfirmActionModalProps = ComponentPropsWithoutRef<'div'> & {
  title: string
  description: string
  confirm: string
  cancel: string
}

export const ConfirmActionModal = ({ title, description, confirm, cancel, ...rest }: ConfirmActionModalProps) => {
  const { proceed, cancel: cancelAction } = useConfirm()
  const { ConfirmActionModal: Slot } = useComponents()

  return (
    <Slot
      {...rest}
      title={title}
      description={description}
      confirm={confirm}
      cancel={cancel}
      onConfirm={() => proceed?.()}
      onCancel={() => cancelAction?.()}
    />
  )
}
