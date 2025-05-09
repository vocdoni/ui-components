import { ComponentType } from 'react'
import { useComponents } from './ComponentsProvider'
import { VocdoniComponentDefinition } from './types'

export const withRegistry = <
  P extends object,
  Category extends keyof VocdoniComponentDefinition,
  Component extends keyof VocdoniComponentDefinition[Category]
>(
  BaseComponent: ComponentType<P>,
  category: Category,
  key: Component
) => {
  const RegistryAwareComponent = (props: P) => {
    const { components } = useComponents()
    const OverrideComponent = components?.[category]?.[key] as ComponentType<P> | undefined

    if (OverrideComponent) {
      return <OverrideComponent {...props} />
    }

    return <BaseComponent {...props} />
  }

  RegistryAwareComponent.displayName = `Registry(${BaseComponent.displayName || BaseComponent.name})`
  return RegistryAwareComponent
}
