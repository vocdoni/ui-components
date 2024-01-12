import { AccountData, ArchivedAccountData, areEqualHexStrings } from '@vocdoni/sdk'
import { Reducer, useEffect, useReducer } from 'react'
import { ErrorPayload } from '../types'
import { errorToString } from '../utils'

export const OrganizationLoadError = 'organization:load:error'
export const OrganizationLoading = 'organization:loading'
export const OrganizationSet = 'organization:set'
export const OrganizationUpdate = 'organization:update'
export const OrganizationUpdateError = 'organization:update:error'

export type OrganizationSetPayload = AccountData
export type OrganizationUpdatePayload = Partial<AccountData>
export type OrganizationLoadErrorPayload = ErrorPayload
export type OrganizationUpdateErrorPayload = ErrorPayload
export type OrganizationLoadingPayload = string | undefined

export type OrganizationActionPayload =
  | OrganizationLoadingPayload
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
  id: string | undefined
  errors: {
    load: string | null
    update: string | null
  }
  organization: AccountData | ArchivedAccountData | undefined
}

export const OrganizationStateEmpty: OrganizationReducerState = {
  loading: false,
  loaded: false,
  id: undefined,
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
      const id = action.payload as OrganizationLoadingPayload
      return {
        ...state,
        id,
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
        loaded: true,
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
        loaded: true,
        errors: {
          ...state.errors,
          update: errorToString(error),
        },
      }
    }
  }

  return state
}

export const useOrganizationReducer = (organization?: AccountData | ArchivedAccountData) => {
  const [state, dispatch] = useReducer(organizationReducer, {
    ...OrganizationStateEmpty,
    organization,
    loaded: !!organization,
  })

  const setOrganization = (organization: AccountData | ArchivedAccountData) =>
    dispatch({ type: OrganizationSet, payload: organization })

  // update org if updated via props
  useEffect(() => {
    if (!organization) return
    if (state.loaded && areEqualHexStrings(state.organization?.address, organization.address)) return

    setOrganization(organization)
  }, [organization, state.loaded, state.organization?.address])

  return {
    state,
    dispatch,
    setOrganization,
    loading: (id?: string) => dispatch({ type: OrganizationLoading, payload: id }),
    updateOrganization: (organization: Partial<AccountData | ArchivedAccountData>) =>
      dispatch({ type: OrganizationUpdate, payload: organization }),
    loadError: (error: string) => dispatch({ type: OrganizationLoadError, payload: error }),
    updateError: (error: string) => dispatch({ type: OrganizationUpdateError, payload: error }),
  }
}
