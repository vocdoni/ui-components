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

    // Ensure components and category exist
    if (!components || !components[category]) {
      console.warn(`Registry: Missing components or category "${String(category)}"`)
      return <BaseComponent {...props} />
    }

    const OverrideComponent = components[category][key] as ComponentType<P> | undefined

    // Log component resolution for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.debug(
        `Registry: Resolving ${String(category)}.${String(key)}`,
        OverrideComponent ? '(using override)' : '(using base)'
      )
    }

    // If we have an override component, use it
    if (OverrideComponent && OverrideComponent !== BaseComponent) {
      return <OverrideComponent {...props} />
    }

    // Otherwise use the base component
    return <BaseComponent {...props} />
  }

  RegistryAwareComponent.displayName = `Registry(${BaseComponent.displayName || BaseComponent.name})`
  return RegistryAwareComponent
}
