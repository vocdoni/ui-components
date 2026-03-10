import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useClient } from '~providers'

export const Balance = (props: ComponentPropsWithoutRef<'span'>) => {
  const { balance } = useClient()
  const { AccountBalance: Slot } = useComponents()
  const t = useReactComponentsLocalize()

  if (balance < 0) return null

  let tone: 'success' | 'warning' | 'danger' = 'success'
  if (balance < 50 && balance > 20) {
    tone = 'warning'
  } else if (balance <= 20) {
    tone = 'danger'
  }

  const label = t('balance', { balance })

  return <Slot {...props} balance={balance} tone={tone} label={label} />
}
