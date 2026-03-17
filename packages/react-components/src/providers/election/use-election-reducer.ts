import { areEqualHexStrings, CensusType, PublishedElection, VocdoniSDKClient, Vote } from '@vocdoni/sdk'
import { Reducer, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { getStorageItem, removeStorageItem, setStorageItem } from '~providers/browser'
import { useClient } from '~providers/client'
import { ClientSetPayload, hasSigner } from '~providers/client/client-utils'
import { ElectionLike, getElectionField, isInvalidElectionLike } from './normalized'
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
export type ElectionSetPayload = ElectionLike
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
  election: ElectionLike | undefined
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

const participation = (election?: ElectionLike) => {
  const current = election as any
  if (!current || isInvalidElectionLike(election) || (!current.census && !current.maxCensusSize)) {
    return 0
  }
  const size = current.census && current.census.size ? current.census.size : current.maxCensusSize
  // Calculate percentage of people who voted
  return Math.round(((current.voteCount || 0) / size) * 10000) / 100
}

// Turnout returns the % of total votes
const turnout = (election?: ElectionLike) => {
  const current = election as any
  if (!current || isInvalidElectionLike(election) || (!current.census && !current.maxCensusSize)) {
    return 0
  }

  const size = current.census && current.census.size ? current.census.size : current.maxCensusSize

  // Calculate total votes (sum of all results if available, otherwise use voteCount)
  const totalVotes = current.results
    ? current.results.reduce((acc, questionResults) => {
        return acc + questionResults.reduce((sum, value) => sum + Number(value), 0)
      }, 0)
    : current.voteCount || 0

  // Calculate percentage of total votes
  return Math.round((totalVotes / size) * 10000) / 100
}

export const electionStateEmpty = ({
  client,
  election,
}: {
  client: VocdoniSDKClient
  election?: ElectionLike
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
    token: undefined,
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
      const rstate = {
        ...state,
        csp: {
          ...state.csp,
          token,
        },
      }
      return {
        ...rstate,
        isAbleToVote: isAbleToVote(rstate),
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
      const rstate = {
        ...state,
        isInCensus,
      }
      return {
        ...rstate,
        isAbleToVote: isAbleToVote(rstate),
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
      const rstate = {
        ...state,
        votesLeft,
      }
      return {
        ...rstate,
        isAbleToVote: isAbleToVote(rstate),
      }
    }

    case ElectionClientSet: {
      const client = action.payload as ClientSetPayload
      return {
        ...state,
        client,
        connected: hasSigner(client?.wallet),
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

export const useElectionReducer = (client: VocdoniSDKClient, election?: ElectionLike) => {
  const initial = electionStateEmpty({ client, election })
  const { connected } = useClient()
  const [storageHydrated, setStorageHydrated] = useState(false)
  const [state, dispatch] = useReducer(electionReducer, {
    ...initial,
    election,
  })
  const previousGlobalClient = useRef(client)

  // Some census types require to have a local client instance. This var stores if the current election is one of those
  const isLocalWalletSigner =
    state.election instanceof PublishedElection &&
    (state.election.census?.type === CensusType.CSP ||
      getElectionField(state.election, 'census.type') === 'spreadsheet')

  useEffect(() => {
    const token = getStorageItem(LSKey.tokenR) || undefined
    if (token) {
      dispatch({ type: ElectionCspStep0, payload: { token } })
    }
    setStorageHydrated(true)
  }, [])

  useEffect(() => {
    if (!storageHydrated) return

    if (state.csp.token) {
      setStorageItem(LSKey.tokenR, state.csp.token)
      return
    }

    removeStorageItem(LSKey.tokenR)
  }, [state.csp.token, storageHydrated])

  // update local client in case it's updated
  useEffect(() => {
    if (!client) return

    const electionHasWallet = hasSigner(state.client?.wallet)
    const globalHasWallet = hasSigner(client?.wallet)

    // only propagate the client when census type !== spreadsheet || type !== blindCsp (since it uses a locally instanced client)
    // Keep legacy local-signer isolation, but allow a one-time sync when election session has no signer
    // and the global client has just connected (login/connect after mount scenario).
    if (isLocalWalletSigner && (electionHasWallet || !globalHasWallet)) {
      return
    }

    const globalClientChanged = previousGlobalClient.current !== client
    previousGlobalClient.current = client

    if (globalClientChanged || state.connected !== connected) {
      dispatch({ type: ElectionClientSet, payload: client })
    }
  }, [client, connected, isLocalWalletSigner, state.connected, state.election])

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
      set: (election: ElectionLike) => dispatch({ type: ElectionSet, payload: election }),
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
