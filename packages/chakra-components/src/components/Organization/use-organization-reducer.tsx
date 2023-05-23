import { AccountData } from '@vocdoni/sdk'
import { Reducer, useReducer } from 'react'

export const OrganizationLoadError = 'organization:load:error'
export const OrganizationLoading = 'organization:loading'
export const OrganizationSet = 'organization:set'
export const OrganizationUpdate = 'organization:update'
export const OrganizationUpdateError = 'organization:update:error'

export type OrganizationSetPayload = AccountData
export type OrganizationUpdatePayload = Partial<AccountData>
export type OrganizationLoadErrorPayload = string | Error
export type OrganizationUpdateErrorPayload = string | Error

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
          load: errorToString(error),
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
          update: errorToString(error),
        },
      }
    }
  }

  return state
}

/**
 * Theoretically, all errors from the SDK should be returned as strings, but this is not true
 * for any error coming from the signer (which is, in part, coming from the SDK). That's why
 * we need to properly cast them to strings. Note we're not using error instanceof Error because
 * it just not works for many signer errors.
 *
 * @param {Error|string} error The error to be casted
 * @returns {string}
 */
const errorToString = (error: Error | string): string => {
  if (typeof error !== 'string' && 'message' in error) {
    return error.message
  }

  return error
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
    updateOrganization: (organization: Partial<AccountData>) =>
      dispatch({ type: OrganizationUpdate, payload: organization }),
    setOrganization: (organization: AccountData) => dispatch({ type: OrganizationSet, payload: organization }),
    loadError: (error: string) => dispatch({ type: OrganizationLoadError, payload: error }),
    updateError: (error: string) => dispatch({ type: OrganizationUpdateError, payload: error }),
  }
}
