import {
  AnonymousService,
  AnonymousVote,
  areEqualHexStrings,
  CensusType,
  ChainAPI,
  InvalidElection,
  PublishedElection,
  Vote,
} from '@vocdoni/sdk'
import { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useClient } from '../client'
import { vote as cspVote } from '../csp'
import worker, { ICircuit, ICircuitWorkerRequest } from '../worker/circuitWorkerScript'
import { useWebWorker } from '../worker/useWebWorker'
import { createWebWorker } from '../worker/webWorker'
import { useElectionReducer } from './use-election-reducer'

export type ElectionProviderProps = {
  id?: string
  election?: PublishedElection | InvalidElection
  ConnectButton?: ComponentType
  fetchCensus?: boolean
  beforeSubmit?: (vote: Vote) => boolean
  autoUpdateInterval?: number
  autoUpdate?: boolean
}

export const useElectionProvider = ({
  id,
  election: data,
  fetchCensus,
  beforeSubmit,
  autoUpdateInterval,
  autoUpdate,
  ...rest
}: ElectionProviderProps) => {
  const { client: c, localize } = useClient()
  const { state, actions } = useElectionReducer(c, data)

  // If id and election data are both provided, it will merge election info with the fetched election
  const [mergeElection, setMergeElection] = useState<boolean>(!!id && !!data)

  const {
    client,
    election,
    loading,
    loaded,
    sik: { password, signature },
  } = state
  const [anonCircuitsFetched, setAnonCircuitsFetched] = useState(false)

  const isAnonCircuitsFetching = useRef(false)

  const fetchElection = useCallback(
    async (id: string) => {
      actions.load(id)
      try {
        actions.set(await client.fetchElection(id))
      } catch (e) {
        actions.error(e)
      }
    },
    [actions, client]
  )

  const censusFetch = useCallback(async () => {
    const address = await client.wallet?.getAddress()
    if (!election || !(election instanceof PublishedElection)) return

    try {
      actions.loadCensus(address as string)
      const isIn = await client.isInCensus({ electionId: election.id })
      actions.inCensus(isIn)
      const censusType = election.census.type as CensusType

      if (isIn && censusType === CensusType.WEIGHTED && !election.electionType.anonymous) {
        actions.voted(await client.hasAlreadyVoted({ electionId: election.id }))

        // no need to check votes left if member ain't in census
        actions.votesLeft(await client.votesLeftCount({ electionId: election.id }))
      }

      // check differs a bit for anonymous votings
      if (isIn && election.electionType.anonymous && signature) {
        const voteId = await AnonymousService.calcVoteId(signature, password ?? '0', election.id)
        const hasAlreadyVoted = await client.hasAlreadyVoted({ voteId, electionId: election.id })
        actions.voted(hasAlreadyVoted)
        const votesLeft = await client.votesLeftCount({ voteId, electionId: election.id })

        actions.votesLeft(votesLeft)
      }

      actions.isAbleToVote()
    } catch (e) {
      console.error('error in census fetch:', e)
      actions.censusError(e)
    }
  }, [actions, client, election, password, signature])

  const workerInstance = useMemo(() => createWebWorker(worker), [])
  const { result: circuits, startProcessing } = useWebWorker<ICircuit, ICircuitWorkerRequest>(workerInstance)

  const fetchAnonCircuits = useCallback(async () => {
    if (!(election instanceof PublishedElection)) return

    const hasOverwriteEnabled =
      typeof election !== 'undefined' &&
      typeof election.voteType.maxVoteOverwrites !== 'undefined' &&
      election.voteType.maxVoteOverwrites > 0

    const votable = state.isAbleToVote || (hasOverwriteEnabled && state.isInCensus && state.voted)

    if (votable && election?.census.type === CensusType.ANONYMOUS) {
      const chainCircuits = await ChainAPI.circuits(client.url)
      const circuits = {
        zKeyURI: chainCircuits.uri + '/' + chainCircuits.circuitPath + '/' + chainCircuits.zKeyFilename,
        zKeyHash: chainCircuits.zKeyHash,
        vKeyURI: chainCircuits.uri + '/' + chainCircuits.circuitPath + '/' + chainCircuits.vKeyFilename,
        vKeyHash: chainCircuits.vKeyHash,
        wasmURI: chainCircuits.uri + '/' + chainCircuits.circuitPath + '/' + chainCircuits.wasmFilename,
        wasmHash: chainCircuits.wasmHash,
      }
      startProcessing({ circuits })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [election, state.isAbleToVote, state.isInCensus, state.voted, client.anonymousService])

  // pre-fetches circuits needed for voting in anonymous elections
  useEffect(() => {
    if (
      !fetchCensus ||
      !election ||
      loading.census ||
      !client.wallet ||
      anonCircuitsFetched ||
      isAnonCircuitsFetching.current
    )
      return
    isAnonCircuitsFetching.current = true
    fetchAnonCircuits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAnonCircuits, client.wallet, election, loading.census, fetchCensus])

  // sets circuits in the anonymous service
  useEffect(() => {
    ;(async () => {
      if (!circuits) return
      setAnonCircuitsFetched(true)
      client.anonymousService.setCircuits(circuits)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuits])

  // fetch election
  useEffect(() => {
    if (!id || !client || loading.election) return
    if (loaded.election && areEqualHexStrings(state.id, id)) return

    fetchElection(id)
  }, [state.id, id, client, loading.election, loaded.election, fetchElection])

  // fetch election whenever the election id changes. This is useful if election data is provided,
  // and you want to fetch the latest data anyway
  useEffect(() => {
    if (!id || !mergeElection || !client || loading.election) return

    fetchElection(id).finally(() => setMergeElection(false))
  }, [client, data, election, fetchElection, id, loading.election, mergeElection])

  // check census information
  useEffect(() => {
    if (!fetchCensus || !election || !loaded.election || loading.census || !client.wallet) return
    ;(async () => {
      const address = await client.wallet?.getAddress()
      // The condition is just negated so we can return the code execution.
      // A less mental option is to not negate the entire condition and add
      // the `await censusFetch()` execution in there
      if (
        !(
          !loaded.census ||
          !areEqualHexStrings(state.voter, address) ||
          (data && !areEqualHexStrings(data.id, election.id)) ||
          // fetch census if there's sik signature and no vote id
          (signature && !state.loaded.voted)
        )
      ) {
        return
      }

      await censusFetch()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCensus, client, state.voter, loaded.election, loading.census, actions, state.isAbleToVote, signature])

  // auto update metadata (if enabled)
  useEffect(() => {
    if (!autoUpdate || !(election && election.id)) return

    const interval = setInterval(() => fetchElection(election.id), autoUpdateInterval || 30000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpdate, autoUpdateInterval, election])

  // context vote function (the one to be used with the given components)
  const vote = async (values: number[]) => {
    if (!client) {
      throw new Error('no client initialized')
    }
    if (!client.wallet) {
      throw new Error('no signer provided')
    }
    if (!election) {
      throw new Error('no election initialized')
    }
    if (!(election instanceof PublishedElection)) {
      throw new Error('only published elections can be voted')
    }

    actions.voting()
    client.setElectionId(election.id)

    try {
      let vote: Vote | AnonymousVote = new Vote(values)
      if (election.electionType.anonymous && signature) {
        vote = new AnonymousVote(values, signature, password)
      }

      actions.setVote(vote)
      if (typeof beforeSubmit === 'function' && !beforeSubmit(vote)) {
        return
      }

      switch (election.census.type) {
        case CensusType.CSP: {
          const vid = await cspVote(client, election, state.csp.token, vote)
          actions.voted(vid)
          break
        }
        case CensusType.ANONYMOUS:
        case CensusType.WEIGHTED: {
          const vid = await weightedVote(vote)
          actions.voted(vid)
          break
        }
        default:
          throw new Error(`unsupported census type "${election.census.type}"`)
      }
      // refetch election info
      await fetchElection(election.id)
    } catch (e) {
      console.error('there was an error voting:', e)
      actions.votingError(e)
    }
  }

  // internal method used by vote for weighted type votes
  const weightedVote = async (vote: Vote): Promise<string> => {
    if (!vote) {
      throw new Error('no vote instance')
    }
    if (![CensusType.WEIGHTED, CensusType.ANONYMOUS].includes((election as PublishedElection)!.census?.type)) {
      throw new Error('not a Weighted election')
    }

    return await client.submitVote(vote)
  }

  return {
    ...rest,
    ...state,
    actions,
    fetchElection,
    localize,
    vote,
    fetchCensus: censusFetch,
    clearClient: actions.clearClient,
    setClient: actions.setClient,
    sikPassword: actions.sikPassword,
    sikSignature: actions.sikSignature,
  }
}
