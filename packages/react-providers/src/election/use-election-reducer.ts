import {
  areEqualHexStrings,
  CensusType,
  InvalidElection,
  PublishedElection,
  VocdoniSDKClient,
  Vote,
} from '@vocdoni/sdk'
import { Reducer, useEffect, useMemo, useReducer } from 'react'
import { useClient } from '../client'
import { ClientSetPayload } from '../client/client-utils'
export const BlindCspServiceKey = 'vocdoni-blind-csp'

export const CensusClear = 'election:census:clear'
export const CensusIsAbleToVote = 'election:census:is_able_to_vote'
export const CensusLoad = 'election:census:load'
export const ElectionClientSet = 'election:client:set'
export const ElectionCspStep0 = 'election:csp:step_0'
export const ElectionCspStep1 = 'election:csp:step_1'
export const ElectionInCensus = 'election:in_census'
export const ElectionLoad = 'election:load'
export const ElectionSet = 'election:set'
export const ElectionVoted = 'election:voted'
export const ElectionVoteSet = 'election:vote:set'
export const ElectionVotesLeft = 'election:votes_left'
export const ElectionVoting = 'election:voting'
export const SikPasswordSet = 'sik:password:set'
export const SikSignatureSet = 'sik:signature:set'

export type ElectionActionType =
  | typeof CensusClear
  | typeof CensusIsAbleToVote
  | typeof CensusLoad
  | typeof ElectionClientSet
  | typeof ElectionCspStep0
  | typeof ElectionCspStep1
  | typeof ElectionInCensus
  | typeof ElectionLoad
  | typeof ElectionSet
  | typeof ElectionVoted
  | typeof ElectionVoteSet
  | typeof ElectionVotesLeft
  | typeof ElectionVoting
  | typeof SikPasswordSet
  | typeof SikSignatureSet

export type CensusIsAbleToVotePayload = undefined | boolean
export type CensusLoadPayload = string
export type ElectionClientSetPayload = VocdoniSDKClient
export type ElectionCspStep0Payload = { token: string }
export type ElectionCspStep1Payload = string
export type ElectionInCensusPayload = boolean
export type ElectionLoadPayload = string | undefined
export type ElectionSetPayload = PublishedElection | InvalidElection
export type ElectionVotedPayload = string | null
export type ElectionVoteSetPayload = Vote
export type ElectionVotesLeftPayload = number
export type SikPayload = string | undefined

export type ElectionActionPayload =
  | CensusIsAbleToVotePayload
  | CensusLoadPayload
  | ElectionClientSetPayload
  | ElectionCspStep0Payload
  | ElectionCspStep1Payload
  | ElectionInCensusPayload
  | ElectionLoadPayload
  | ElectionSetPayload
  | ElectionVotedPayload
  | ElectionVoteSetPayload
  | ElectionVotesLeftPayload
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
  election: PublishedElection | InvalidElection | undefined
  vote: Vote | undefined
  voter: string | undefined
  votesLeft: number
  voted: string | null
  voting: boolean
  csp: {
    token: string | undefined
  }
  sik: {
    password: string | undefined
    signature: string | undefined
  }
  participation: number
  turnout: number
}

export enum LSKey {
  tokenR = 'csp_token',
}

const participation = (election?: PublishedElection | InvalidElection) => {
  if (!election || election instanceof InvalidElection || (!election.census && !election.maxCensusSize)) {
    return 0
  }
  const size = election.census && election.census.size ? election.census.size : election.maxCensusSize
  // Calculate percentage of people who voted
  return Math.round((election.voteCount / size) * 10000) / 100
}

// Turnout returns the % of total votes
const turnout = (election?: PublishedElection | InvalidElection) => {
  if (!election || election instanceof InvalidElection || (!election.census && !election.maxCensusSize)) {
    return 0
  }

  const size = election.census && election.census.size ? election.census.size : election.maxCensusSize

  // Calculate total votes (sum of all results if available, otherwise use voteCount)
  const totalVotes = election.results
    ? election.results.reduce((acc, questionResults) => {
        return acc + questionResults.reduce((sum, value) => sum + Number(value), 0)
      }, 0)
    : election.voteCount || 0

  // Calculate percentage of total votes
  return Math.round((totalVotes / size) * 10000) / 100
}

export const electionStateEmpty = ({
  client,
  election,
}: {
  client: VocdoniSDKClient
  election?: PublishedElection | InvalidElection
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
  voting: false,
  csp: {
    token: localStorage.getItem(LSKey.tokenR) || undefined,
  },
  sik: {
    password: undefined,
    signature: undefined,
  },
  participation: participation(election),
  turnout: turnout(election),
})

const isAbleToVote = (state: ElectionReducerState, payload?: boolean) => {
  if (typeof payload === 'boolean') {
    return payload
  }

  if (!(state.election instanceof PublishedElection)) {
    // This returned always true for historical reasons. null makes more sense
    // but the change might have side effects, so we'll see...
    return null
  }

  const hasCspAccess = !!state.csp.token && state.isInCensus
  const canOverwrite = (state.election.voteType?.maxVoteOverwrites ?? 0) > 0

  return (
    (state.isInCensus && state.votesLeft > 0) ||
    (hasCspAccess && (!state.voted || (state.voted && canOverwrite))) ||
    (state.isInCensus && state.election?.electionType.anonymous && !state.voted)
  )
}

const electionReducer: Reducer<ElectionReducerState, ElectionAction> = (
  state: ElectionReducerState,
  action: ElectionAction
) => {
  switch (action.type) {
    case CensusClear: {
      localStorage.removeItem(LSKey.tokenR)
      return electionStateEmpty({ client: state.client, election: state.election })
    }
    case CensusLoad: {
      const payload = action.payload as CensusLoadPayload
      return {
        ...state,
        voter: payload,
      }
    }

    case CensusIsAbleToVote: {
      const payload = action.payload as CensusIsAbleToVotePayload
      return {
        ...state,
        isAbleToVote: isAbleToVote(state, payload),
      }
    }

    case ElectionCspStep0: {
      const data = action.payload as ElectionCspStep0Payload
      return {
        ...state,
        csp: {
          ...state.csp,
          ...data,
        },
      }
    }

    case ElectionCspStep1: {
      const token = action.payload as ElectionCspStep1Payload
      localStorage.setItem(LSKey.tokenR, token)
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
      }

    case ElectionSet: {
      const election = action.payload as ElectionSetPayload
      return {
        ...state,
        election,
        participation: participation(election),
        turnout: turnout(election),
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
      const shouldDecrement = !!voted && state.voting
      const nextVotesLeft = shouldDecrement ? Math.max(0, state.votesLeft - 1) : state.votesLeft
      const rstate = {
        ...state,
        voted,
        votesLeft: nextVotesLeft,
        vote: undefined,
        voting: false,
      }
      return {
        ...rstate,
        isAbleToVote: isAbleToVote(rstate),
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
        voting: true,
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
        connected: !!client && !!client.wallet && Object.keys(client.wallet).length > 0,
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

export const useElectionReducer = (client: VocdoniSDKClient, election?: PublishedElection | InvalidElection) => {
  const initial = electionStateEmpty({ client, election })
  const { connected } = useClient()
  const [state, dispatch] = useReducer(electionReducer, {
    ...initial,
    election,
  })

  // Some census types require to have a local client instance. This var stores if the current election is one of those
  const isLocalWalletSigner =
    state.election instanceof PublishedElection &&
    (state.election.census?.type === CensusType.CSP ||
      (state.election?.meta && state.election.get('census.type') === 'spreadsheet'))

  // update local client in case it's updated
  useEffect(() => {
    if (!client) return

    // only propagate the client when census type !== spreadsheet || type !== blindCsp (since it uses a locally instanced client)
    if (isLocalWalletSigner) {
      return
    }

    dispatch({ type: ElectionClientSet, payload: client })
  }, [client, isLocalWalletSigner, state.election])

  // properly set election data in case it comes from props (and/or updates)
  useEffect(() => {
    if (!election) return
    if (state.election && areEqualHexStrings(state.election?.id, election.id)) return

    dispatch({ type: ElectionSet, payload: election })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [election?.id, state.election])

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
      (!connected && isLocalWalletSigner) ||
      // we don't want to clear the local client on Signer sessions (non wallet ones)
      (!state.connected && !isLocalWalletSigner)
    ) {
      return
    }

    dispatch({ type: CensusClear })
  }, [state.connected, connected, state.election])

  const actions = useMemo(
    () => ({
      clear: () => dispatch({ type: CensusClear }),
      set: (election: PublishedElection | InvalidElection) => dispatch({ type: ElectionSet, payload: election }),
      setClient: (client: VocdoniSDKClient) => dispatch({ type: ElectionClientSet, payload: client }),
      sikPassword: (password: SikPayload) => dispatch({ type: SikPasswordSet, payload: password }),
      sikSignature: (signature: SikPayload) => dispatch({ type: SikSignatureSet, payload: signature }),
      clearClient: () => {
        dispatch({ type: ElectionClientSet, payload: client })
        dispatch({ type: SikPasswordSet, payload: undefined })
        dispatch({ type: SikSignatureSet, payload: undefined })
        dispatch({ type: CensusClear })
      },
      load: (id?: string) => dispatch({ type: ElectionLoad, payload: id }),
      csp0: (data: ElectionCspStep0Payload) => dispatch({ type: ElectionCspStep0, payload: data }),
      csp1: (token: string) => dispatch({ type: ElectionCspStep1, payload: token }),
      loadCensus: (voter: string) => dispatch({ type: CensusLoad, payload: voter }),
      setVote: (vote: Vote) => dispatch({ type: ElectionVoteSet, payload: vote }),
      inCensus: (isIn: boolean) => dispatch({ type: ElectionInCensus, payload: isIn }),
      isAbleToVote: (isAble?: boolean) => dispatch({ type: CensusIsAbleToVote, payload: isAble }),
      voted: (voted: string) => dispatch({ type: ElectionVoted, payload: voted }),
      voting: () => dispatch({ type: ElectionVoting }),
      votesLeft: (votesLeft: number) => dispatch({ type: ElectionVotesLeft, payload: votesLeft }),
    }),
    [client, dispatch]
  )

  return {
    state,
    dispatch,
    actions,
  }
}
