import { CensusType, PublishedElection, VocdoniSDKClient, Vote, areEqualHexStrings } from '@vocdoni/sdk'
import { Reducer, useEffect, useReducer } from 'react'
import { useClient } from '../client'
import { ClientSetPayload } from '../client/use-client-reducer'
import type { ErrorPayload } from '../types'
import { errorToString } from '../utils'

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

export type CensusErrorPayload = ErrorPayload
export type CensusIsAbleToVotePayload = undefined | boolean
export type CensusLoadPayload = string
export type ElectionClientSetPayload = VocdoniSDKClient
export type ElectionCspStep0Payload = string
export type ElectionCspStep1Payload = string
export type ElectionErrorPayload = ErrorPayload
export type ElectionInCensusPayload = boolean
export type ElectionLoadPayload = string | undefined
export type ElectionSetPayload = PublishedElection
export type ElectionVotedPayload = string | null
export type ElectionVoteSetPayload = Vote
export type ElectionVotesLeftPayload = number
export type ElectionVotingErrorPayload = ErrorPayload

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

export interface ElectionAction {
  type: ElectionActionType
  payload?: ElectionActionPayload
}

export interface ElectionReducerState {
  client: VocdoniSDKClient
  id: string | undefined
  isAbleToVote: boolean | undefined
  isInCensus: boolean
  election: PublishedElection | undefined
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
  }
  errors: {
    census: string | null
    election: string | null
    voting: string | null
  }
  csp: {
    handler: 'github'
    token: string | undefined
    authToken: string | undefined
  }
}

export const ElectionStateEmpty = ({
  client,
  election,
}: {
  client: VocdoniSDKClient
  election?: PublishedElection
}): ElectionReducerState => ({
  client,
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
    election: false,
  },
  errors: {
    census: null,
    election: null,
    voting: null,
  },
  csp: {
    handler: 'github',
    token: undefined,
    authToken: undefined,
  },
})

const electionReducer: Reducer<ElectionReducerState, ElectionAction> = (
  state: ElectionReducerState,
  action: ElectionAction
) => {
  switch (action.type) {
    case CensusClear: {
      return {
        ...state,
        voted: null,
        loading: {
          ...state.loading,
          census: false,
        },
        loaded: {
          ...state.loaded,
          census: false,
        },
        votesLeft: 0,
        isAbleToVote: false,
      }
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
        isAbleToVote:
          payload || (state.votesLeft > 0 && state.isInCensus) || state.election?.census.type === CensusType.CSP,
      }
    }

    case ElectionCspStep0: {
      const authToken = action.payload as ElectionCspStep0Payload
      return {
        ...state,
        csp: {
          ...state.csp,
          authToken,
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
      return {
        ...state,
        voted,
        vote: undefined,
        loaded: {
          ...state.loaded,
          census: true,
        },
        loading: {
          ...state.loading,
          census: false,
          voting: false,
        },
        votesLeft: state.votesLeft - 1,
        csp: {
          ...state.csp,
          authToken: undefined,
          token: undefined,
        },
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
  }

  return state
}

export const useElectionReducer = (client: VocdoniSDKClient, election?: PublishedElection) => {
  const initial = ElectionStateEmpty({ client, election })
  const { connected } = useClient()
  const [state, dispatch] = useReducer(electionReducer, {
    ...initial,
    election,
    loaded: {
      ...initial.loaded,
      election: !!election,
    },
  })

  const clear = () => dispatch({ type: CensusClear })
  const setClient = (client: VocdoniSDKClient) => dispatch({ type: ElectionClientSet, payload: client })
  const set = (election: PublishedElection) => dispatch({ type: ElectionSet, payload: election })

  // update local client in case it's updated
  useEffect(() => {
    if (!client) return

    setClient(client)
  }, [client])

  // properly set election data in case it comes from props (and/or updates)
  useEffect(() => {
    if (!election) return
    if (state.loaded.election && areEqualHexStrings(state.election?.id, election.id)) return

    set(election)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [election?.id, state.loaded.election])

  // ensure user data is cleared on logout
  useEffect(() => {
    if (connected) return

    clear()
  }, [connected])

  return {
    state,
    dispatch,
    actions: {
      clear,
      set,
      setClient,
      load: (id?: string) => dispatch({ type: ElectionLoad, payload: id }),
      csp0: (token: string) => dispatch({ type: ElectionCspStep0, payload: token }),
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
