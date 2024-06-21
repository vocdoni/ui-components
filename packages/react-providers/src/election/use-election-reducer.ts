import {
  ArchivedElection,
  areEqualHexStrings,
  CensusType,
  InvalidElection,
  PublishedElection,
  VocdoniSDKClient,
  Vote,
} from '@vocdoni/sdk'
import { Reducer, useEffect, useReducer } from 'react'
import { useClient } from '../client'
import { ClientSetPayload } from '../client/use-client-reducer'
import type { ErrorPayload } from '../types'
import { errorToString } from '../utils'

export const BlindCspServiceKey = 'vocdoni-blind-csp'

export const CensusClear = 'election:census:clear'
export const CensusError = 'election:census:error'
export const CensusIsAbleToVote = 'election:census:is_able_to_vote'
export const CensusLoad = 'election:census:load'
export const ElectionClientSet = 'election:client:set'
export const ElectionCspStep0 = 'election:csp:step_0'
export const ElectionCspStep1 = 'election:csp:step_1'
export const ElectionError = 'election:error'
export const ElectionInCensus = 'election:in_census'
export const ElectionLoad = 'election:load'
export const ElectionSet = 'election:set'
export const ElectionVoted = 'election:voted'
export const ElectionVoteSet = 'election:vote:set'
export const ElectionVotesLeft = 'election:votes_left'
export const ElectionVoting = 'election:voting'
export const ElectionVotingError = 'election:voting:error'
export const SikPasswordSet = 'sik:password:set'
export const SikSignatureSet = 'sik:signature:set'

export type ElectionActionType =
  | typeof CensusClear
  | typeof CensusError
  | typeof CensusIsAbleToVote
  | typeof CensusLoad
  | typeof ElectionClientSet
  | typeof ElectionCspStep0
  | typeof ElectionCspStep1
  | typeof ElectionError
  | typeof ElectionInCensus
  | typeof ElectionLoad
  | typeof ElectionSet
  | typeof ElectionVoted
  | typeof ElectionVoteSet
  | typeof ElectionVotesLeft
  | typeof ElectionVoting
  | typeof ElectionVotingError
  | typeof SikPasswordSet
  | typeof SikSignatureSet

export type CensusErrorPayload = ErrorPayload
export type CensusIsAbleToVotePayload = undefined | boolean
export type CensusLoadPayload = string
export type ElectionClientSetPayload = VocdoniSDKClient
export type ElectionCspStep0Payload = { handler: string; token: string }
export type ElectionCspStep1Payload = string
export type ElectionErrorPayload = ErrorPayload
export type ElectionInCensusPayload = boolean
export type ElectionLoadPayload = string | undefined
export type ElectionSetPayload = PublishedElection
export type ElectionVotedPayload = string | null
export type ElectionVoteSetPayload = Vote
export type ElectionVotesLeftPayload = number
export type ElectionVotingErrorPayload = ErrorPayload
export type SikPayload = string | undefined

export type ElectionActionPayload =
  | CensusErrorPayload
  | CensusLoadPayload
  | ElectionErrorPayload
  | ElectionInCensusPayload
  | ElectionLoadPayload
  | ElectionSetPayload
  | ElectionVotedPayload
  | ElectionVoteSetPayload
  | ElectionVotesLeftPayload
  | ElectionVotingErrorPayload
  | SikPayload

export interface ElectionAction {
  type: ElectionActionType
  payload?: ElectionActionPayload
}

export interface ElectionReducerState {
  client: VocdoniSDKClient
  connected: boolean
  id: string | undefined
  isAbleToVote: boolean | undefined
  isInCensus: boolean
  election: PublishedElection | InvalidElection | ArchivedElection | undefined
  vote: Vote | undefined
  voter: string | undefined
  votesLeft: number
  voted: string | null
  loading: {
    census: boolean
    election: boolean
    voting: boolean
  }
  loaded: {
    census: boolean
    election: boolean
    voted: boolean
  }
  errors: {
    census: string | null
    election: string | null
    voting: string | null
  }
  csp: {
    token: string | undefined
    authToken: string | undefined
  }
  sik: {
    password: string | undefined
    signature: string | undefined
  }
}

export const electionStateEmpty = ({
  client,
  election,
}: {
  client: VocdoniSDKClient
  election?: PublishedElection | InvalidElection | ArchivedElection
}): ElectionReducerState => ({
  client,
  connected: false,
  id: election?.id || undefined,
  isAbleToVote: undefined,
  isInCensus: false,
  election,
  vote: undefined,
  voter: undefined,
  votesLeft: 0,
  voted: null,
  loading: {
    census: false,
    election: false,
    voting: false,
  },
  loaded: {
    census: false,
    election: !!election,
    voted: false,
  },
  errors: {
    census: null,
    election: null,
    voting: null,
  },
  csp: {
    token: undefined,
    authToken: undefined,
  },
  sik: {
    password: undefined,
    signature: undefined,
  },
})

const isAbleToVote = (state: ElectionReducerState, payload?: boolean) =>
  payload ||
  !(state.election instanceof PublishedElection) ||
  (state.isInCensus && state.votesLeft > 0) ||
  // TODO: the following two cases should be reviewed/improved. The anonymous one is a trick
  // to allow users to vote, and should be properly done when the SIK flow is completelly implemented.
  // The CSP case is similar, since we're allowing everyone to vote here, and maybe it should be defined
  // separately, based on async operations the CSP requires.
  (state.isInCensus && state.election?.electionType.anonymous && !state.voted) ||
  state.election?.census.type === CensusType.CSP

const electionReducer: Reducer<ElectionReducerState, ElectionAction> = (
  state: ElectionReducerState,
  action: ElectionAction
) => {
  switch (action.type) {
    case CensusClear: {
      return electionStateEmpty({ client: state.client, election: state.election })
    }
    case CensusError: {
      const payload = action.payload as CensusErrorPayload
      return {
        ...state,
        voted: null,
        loading: {
          ...state.loading,
          census: false,
        },
        errors: {
          ...state.errors,
          census: errorToString(payload),
        },
        votesLeft: 0,
        isAbleToVote: false,
      }
    }
    case CensusLoad: {
      const payload = action.payload as CensusLoadPayload
      return {
        ...state,
        voter: payload,
        loading: {
          ...state.loading,
          census: true,
        },
      }
    }

    case CensusIsAbleToVote: {
      const payload = action.payload as CensusIsAbleToVotePayload
      return {
        ...state,
        loading: {
          ...state.loading,
          census: false,
        },
        loaded: {
          ...state.loaded,
          census: true,
        },
        isAbleToVote: isAbleToVote(state, payload),
      }
    }

    case ElectionCspStep0: {
      const data = action.payload as ElectionCspStep0Payload
      return {
        ...state,
        csp: {
          ...state.csp,
          authToken: data.token,
          handler: data.handler,
        },
      }
    }

    case ElectionCspStep1: {
      const token = action.payload as ElectionCspStep1Payload
      return {
        ...state,
        csp: {
          ...state.csp,
          token,
        },
      }
    }

    case ElectionLoad:
      const id = action.payload as ElectionLoadPayload
      return {
        ...state,
        id,
        loading: {
          ...state.loading,
          election: true,
        },
      }

    case ElectionSet: {
      const election = action.payload as ElectionSetPayload
      return {
        ...state,
        loaded: {
          ...state.loaded,
          election: true,
        },
        loading: {
          ...state.loading,
          election: false,
        },
        errors: {
          ...state.errors,
          election: null,
        },
        election,
      }
    }

    case ElectionError: {
      const error = action.payload as ElectionErrorPayload
      return {
        ...state,
        loaded: {
          ...state.loaded,
          election: true,
        },
        loading: {
          ...state.loading,
          election: false,
        },
        errors: {
          ...state.errors,
          election: errorToString(error),
        },
      }
    }

    case ElectionInCensus: {
      const isInCensus = action.payload as ElectionInCensusPayload
      return {
        ...state,
        isInCensus,
      }
    }

    case ElectionVoted: {
      const voted = action.payload as ElectionVotedPayload
      // update state beforehand so `isAbleToVote` is properly calculated
      const rstate = {
        ...state,
        voted,
        votesLeft: state.votesLeft - 1,
        vote: undefined,
        loaded: {
          ...state.loaded,
          census: true,
          voted: true,
        },
        loading: {
          ...state.loading,
          census: false,
          voting: false,
        },
        csp: {
          ...state.csp,
          authToken: undefined,
          token: undefined,
        },
      }
      return {
        ...rstate,
        isAbleToVote: isAbleToVote(rstate, false),
      }
    }

    case ElectionVoteSet: {
      const vote = action.payload as ElectionVoteSetPayload
      return {
        ...state,
        vote,
      }
    }

    case ElectionVoting: {
      return {
        ...state,
        voted: null,
        loading: {
          ...state.loading,
          voting: true,
        },
        errors: {
          ...state.errors,
          voting: null,
        },
      }
    }

    case ElectionVotesLeft: {
      const votesLeft = action.payload as ElectionVotesLeftPayload
      return {
        ...state,
        votesLeft,
      }
    }

    case ElectionClientSet: {
      const client = action.payload as ClientSetPayload
      return {
        ...state,
        client,
        connected: true,
      }
    }

    case ElectionVotingError: {
      const payload = action.payload as ElectionVotingErrorPayload
      return {
        ...state,
        voted: null,
        loading: {
          ...state.loading,
          voting: false,
        },
        errors: {
          ...state.errors,
          voting: errorToString(payload),
        },
      }
    }
    case SikPasswordSet: {
      const password = action.payload as SikPayload
      return {
        ...state,
        sik: {
          ...state.sik,
          password,
        },
      }
    }
    case SikSignatureSet: {
      const signature = action.payload as SikPayload
      return {
        ...state,
        sik: {
          ...state.sik,
          signature,
        },
      }
    }
    default:
      return state
  }
}

export const useElectionReducer = (
  client: VocdoniSDKClient,
  election?: PublishedElection | ArchivedElection | InvalidElection
) => {
  const initial = electionStateEmpty({ client, election })
  const { connected } = useClient()
  const [state, dispatch] = useReducer(electionReducer, {
    ...initial,
    election,
  })

  const clear = () => dispatch({ type: CensusClear })
  const setClient = (client: VocdoniSDKClient) => dispatch({ type: ElectionClientSet, payload: client })
  const set = (election: PublishedElection | ArchivedElection | InvalidElection) =>
    dispatch({ type: ElectionSet, payload: election })
  const sikPassword = (password: SikPayload) => dispatch({ type: SikPasswordSet, payload: password })
  const sikSignature = (signature: SikPayload) => dispatch({ type: SikSignatureSet, payload: signature })
  // Some census types require to have a local client instance. This var stores if the current election is one of those
  const isSignerSessionCensusType =
    state.election instanceof PublishedElection &&
    state.election?.meta &&
    (state.election.get('census.type') === 'spreadsheet' ||
      (state.election.get('census.type') === 'csp' && state.election.meta.csp?.service === BlindCspServiceKey))

  // update local client in case it's updated
  useEffect(() => {
    if (!client) return

    // only propagate the client when census type !== spreadsheet || type !== blindCsp (since it uses a locally instanced client)
    if (isSignerSessionCensusType) {
      return
    }

    setClient(client)
  }, [client, isSignerSessionCensusType, state.election])

  // properly set election data in case it comes from props (and/or updates)
  useEffect(() => {
    if (!election) return
    if (state.loaded.election && areEqualHexStrings(state.election?.id, election.id)) return

    set(election)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [election?.id, state.loaded.election])

  // ensure user data is cleared on logout
  useEffect(() => {
    // we don't want to clear the session when we're connected everywhere
    if ((state.connected && connected) || !(state.election instanceof PublishedElection)) return

    // if there's no meta census information, avoid clearing it from state (process does not follow our way to create them)
    if (!state.election?.meta?.census) {
      return
    }

    if (
      // we don't want to disconnect the local client for Wallet sessions when the main client gets disconnected
      (!connected && isSignerSessionCensusType) ||
      // we don't want to clear the local client on Signer sessions (non wallet ones)
      (!state.connected && !isSignerSessionCensusType)
    ) {
      return
    }

    clear()
  }, [state.connected, connected, state.election])

  return {
    state,
    dispatch,
    actions: {
      clear,
      set,
      setClient,
      sikPassword,
      sikSignature,
      clearClient: () => {
        setClient(client)
        sikPassword(undefined)
        sikSignature(undefined)
        clear()
      },
      load: (id?: string) => dispatch({ type: ElectionLoad, payload: id }),
      csp0: (data: ElectionCspStep0Payload) => dispatch({ type: ElectionCspStep0, payload: data }),
      csp1: (token: string) => dispatch({ type: ElectionCspStep1, payload: token }),
      error: (error: ElectionErrorPayload) => dispatch({ type: ElectionError, payload: error }),
      loadCensus: (voter: string) => dispatch({ type: CensusLoad, payload: voter }),
      censusError: (error: CensusErrorPayload) => dispatch({ type: CensusError, payload: error }),
      setVote: (vote: Vote) => dispatch({ type: ElectionVoteSet, payload: vote }),
      inCensus: (isIn: boolean) => dispatch({ type: ElectionInCensus, payload: isIn }),
      isAbleToVote: (isAble?: boolean) => dispatch({ type: CensusIsAbleToVote, payload: isAble }),
      voted: (voted: string) => dispatch({ type: ElectionVoted, payload: voted }),
      voting: () => dispatch({ type: ElectionVoting }),
      votesLeft: (votesLeft: number) => dispatch({ type: ElectionVotesLeft, payload: votesLeft }),
      votingError: (error: ElectionVotingErrorPayload) => dispatch({ type: ElectionVotingError, payload: error }),
    },
  }
}
