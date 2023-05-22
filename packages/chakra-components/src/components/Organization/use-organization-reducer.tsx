import { AccountData } from '@vocdoni/sdk'
import { Reducer, useReducer } from 'react'

export const OrganizationLoadError = 'organization:load:error'
export const OrganizationLoading = 'organization:loading'
export const OrganizationSet = 'organization:set'
export const OrganizationUpdate = 'organization:update'
export const OrganizationUpdateError = 'organization:update:error'

export type OrganizationSetPayload = AccountData
export type OrganizationUpdatePayload = Partial<AccountData>
export type OrganizationLoadErrorPayload = string
export type OrganizationUpdateErrorPayload = string

export type OrganizationActionPayload =
  | OrganizationSetPayload
  | OrganizationUpdatePayload
  | OrganizationUpdateErrorPayload
  | OrganizationLoadErrorPayload

export type OrganizationActionType =
  | typeof OrganizationSet
  | typeof OrganizationUpdate
  | typeof OrganizationUpdateError
  | typeof OrganizationLoading
  | typeof OrganizationLoadError

export interface OrganizationAction {
  type: OrganizationActionType
  payload?: OrganizationActionPayload
}

export interface OrganizationReducerState {
  loading: boolean
  loaded: boolean
  errors: {
    load: string | null
    update: string | null
  }
  organization: AccountData | undefined
}

export const OrganizationStateEmpty: OrganizationReducerState = {
  loading: false,
  loaded: false,
  errors: {
    load: null,
    update: null,
  },
  organization: undefined,
}

const organizationReducer: Reducer<OrganizationReducerState, OrganizationAction> = (
  state: OrganizationReducerState,
  action: OrganizationAction
) => {
  switch (action.type) {
    case OrganizationLoading:
      return {
        ...state,
        loading: true,
      }

    case OrganizationUpdate: {
      const payload = action.payload as OrganizationUpdatePayload
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        organization: {
          ...state.organization,
          ...(payload as AccountData),
        },
      }
    }

    case OrganizationSet: {
      const organization = action.payload as OrganizationSetPayload
      return {
        ...state,
        loaded: true,
        loading: false,
        errors: {
          ...state.errors,
          load: null,
        },
        organization,
      }
    }

    case OrganizationLoadError: {
      const error = action.payload as OrganizationLoadErrorPayload
      return {
        ...state,
        loading: false,
        loaded: false,
        errors: {
          ...state.errors,
          load: error,
        },
      }
    }

    case OrganizationUpdateError: {
      const error = action.payload as OrganizationUpdateErrorPayload
      return {
        ...state,
        loading: false,
        loaded: false,
        errors: {
          ...state.errors,
          update: error,
        },
      }
    }
  }

  return state
}

export const useOrganizationReducer = (organization?: AccountData) => {
  const [state, dispatch] = useReducer(organizationReducer, {
    ...OrganizationStateEmpty,
    organization,
    loaded: !!organization,
  })

  return {
    state,
    dispatch,
    loading: () => dispatch({ type: OrganizationLoading }),
    updateAccount: (account: Partial<AccountData>) => dispatch({ type: OrganizationUpdate, payload: account }),
    setAccount: (account: AccountData) => dispatch({ type: OrganizationSet, payload: account }),
    loadError: (error: string) => dispatch({ type: OrganizationLoadError, payload: error }),
    updateError: (error: string) => dispatch({ type: OrganizationUpdateError, payload: error }),
  }
}
