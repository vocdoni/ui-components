import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { ComponentsContextValue, VocdoniComponentDefinition } from './types'

const ComponentsContext = createContext<ComponentsContextValue | undefined>(undefined)

export interface ComponentsProviderProps {
  components?: Partial<VocdoniComponentDefinition>
}

export const useComponents = () => {
  const context = useContext(ComponentsContext)
  if (!context) {
    throw new Error('useComponents must be used within a ComponentsProvider')
  }
  return context
}

const createEmptyComponent = () => () => null

const createDefaultComponents = (): VocdoniComponentDefinition => ({
  Election: {
    Actions: createEmptyComponent(),
    Description: createEmptyComponent(),
    Election: createEmptyComponent(),
    Envelope: createEmptyComponent(),
    Header: createEmptyComponent(),
    Questions: createEmptyComponent(),
    Results: createEmptyComponent(),
    Schedule: createEmptyComponent(),
    SpreadsheetAccess: createEmptyComponent(),
    StatusBadge: createEmptyComponent(),
    Title: createEmptyComponent(),
    VoteButton: createEmptyComponent(),
    VoteWeight: createEmptyComponent(),
  },
})

const mergeComponents = (
  base: VocdoniComponentDefinition,
  override?: Partial<VocdoniComponentDefinition>
): VocdoniComponentDefinition => {
  if (!override) return base
  return {
    Election: {
      ...base.Election,
      ...override.Election,
    },
  }
}

export const ComponentsProvider = ({
  children,
  components: initialComponents = {},
}: PropsWithChildren<ComponentsProviderProps>) => {
  const [components, setComponents] = useState<VocdoniComponentDefinition>(() =>
    mergeComponents(createDefaultComponents(), initialComponents)
  )

  const override = (overrides: Partial<VocdoniComponentDefinition>) => {
    setComponents((prev) => mergeComponents(prev, overrides))
  }

  const value: ComponentsContextValue = {
    components,
    override,
  }

  return <ComponentsContext.Provider value={value}>{children}</ComponentsContext.Provider>
}
