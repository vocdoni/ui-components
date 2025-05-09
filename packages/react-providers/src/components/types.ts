import { ComponentType } from 'react'

export interface VocdoniComponentDefinition {
  Election: {
    Actions: ComponentType<any>
    Description: ComponentType<any>
    Election: ComponentType<any>
    Envelope: ComponentType<any>
    Header: ComponentType<any>
    Questions: ComponentType<any>
    Results: ComponentType<any>
    Schedule: ComponentType<any>
    SpreadsheetAccess: ComponentType<any>
    StatusBadge: ComponentType<any>
    Title: ComponentType<any>
    VoteButton: ComponentType<any>
    VoteWeight: ComponentType<any>
  }
}

export interface ComponentsContextValue {
  components: VocdoniComponentDefinition
  override: (overrides: Partial<VocdoniComponentDefinition>) => void
}
