import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query'
import {
  AnonymousService,
  AnonymousVote,
  areEqualHexStrings,
  CensusType,
  ChainAPI,
  HasAlreadyVotedOptions,
  InvalidElection,
  PublishedElection,
  Vote,
  VoteInfoResponse,
  VotesLeftCountOptions,
} from '@vocdoni/sdk'
import { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useClient } from '~providers/client'
import { vote as cspVote, fetchSignInfo } from '~providers/csp'
import { useElectionReducer } from './use-election-reducer'
import { queryKeys } from '~providers/query/keys'
import { errorToString } from '~providers/utils'
import worker, { ICircuit, ICircuitWorkerRequest } from '~providers/worker/circuitWorkerScript'
import { useWebWorker } from '~providers/worker/useWebWorker'
import { createWebWorker } from '~providers/worker/webWorker'

export type ElectionProviderProps = {
  id?: string
  election?: PublishedElection | InvalidElection
  queryOptions?: Omit<UseQueryOptions<PublishedElection | InvalidElection, unknown>, 'queryKey' | 'queryFn' | 'enabled'>
  ConnectButton?: ComponentType
  fetchCensus?: boolean
  beforeSubmit?: (vote: Vote) => boolean
}

export const useElectionProvider = ({
  id,
  election: data,
  queryOptions,
  fetchCensus,
  beforeSubmit,
  ...rest
}: ElectionProviderProps) => {
  const { client: c, localize, generateSigner } = useClient()
  const queryClient = useQueryClient()
  const { state, actions } = useElectionReducer(c, data)

  const {
    client,
    election,
    sik: { password, signature },
  } = state
  const [anonCircuitsFetched, setAnonCircuitsFetched] = useState(false)
  const [loading, setLoading] = useState({
    census: false,
    election: false,
    voting: false,
  })
  const [loaded, setLoaded] = useState({
    census: false,
    election: !!data,
    voted: false,
  })
  const [errors, setErrors] = useState({
    census: null as string | null,
    election: null as string | null,
    voting: null as string | null,
  })

  const isAnonCircuitsFetching = useRef(false)

  const setVoted = useCallback(
    (voteId: string | null) => {
      actions.voted(voteId)
      setLoaded((prev) => ({ ...prev, census: true, voted: true }))
      setLoading((prev) => ({ ...prev, census: false, voting: false }))
    },
    [actions]
  )

  const setIsAbleToVote = useCallback(
    (payload?: boolean) => {
      actions.isAbleToVote(payload)
      setLoaded((prev) => ({ ...prev, census: true }))
      setLoading((prev) => ({ ...prev, census: false }))
    },
    [actions]
  )

  const currentElectionId = id
  const electionQueryKey = currentElectionId ? queryKeys.election.byId(currentElectionId) : ['election', 'disabled']
  const electionQuery = useQuery({
    queryKey: electionQueryKey,
    queryFn: () => client.fetchElection(currentElectionId as string),
    enabled: !!currentElectionId && !!client,
    initialData: data,
    ...queryOptions,
  })

  const fetchElection = useCallback(
    async (id: string) => {
      actions.load(id)
      setLoading((prev) => ({ ...prev, election: true }))
      setErrors((prev) => ({ ...prev, election: null }))
      try {
        if (currentElectionId && id === currentElectionId && electionQuery.refetch) {
          const { data: refreshed } = await electionQuery.refetch()
          if (refreshed) {
            actions.set(refreshed)
          }
        } else {
          const fetched = await queryClient.fetchQuery({
            queryKey: queryKeys.election.byId(id),
            queryFn: () => client.fetchElection(id),
          })
          actions.set(fetched)
        }
        setLoaded((prev) => ({ ...prev, election: true }))
        setLoading((prev) => ({ ...prev, election: false }))
      } catch (e) {
        setLoaded((prev) => ({ ...prev, election: true }))
        setLoading((prev) => ({ ...prev, election: false }))
        setErrors((prev) => ({ ...prev, election: errorToString(e) }))
      }
    },
    [actions, client, currentElectionId, electionQuery, queryClient]
  )

  const censusFetch = useCallback(async () => {
    const address = await client.wallet?.getAddress()
    if (!election || !(election instanceof PublishedElection)) return

    try {
      setLoading((prev) => ({ ...prev, census: true }))
      setErrors((prev) => ({ ...prev, census: null }))
      actions.loadCensus(address as string)
      const isCsp = election.census.type === CensusType.CSP
      const isIn = isCsp ? !!state.csp.token : await client.isInCensus({ electionId: election.id })
      actions.inCensus(isIn)

      const censusType = election.census.type as CensusType

      const requestData: HasAlreadyVotedOptions | VotesLeftCountOptions = {
        electionId: election.id,
      }

      if (isIn && election.electionType.anonymous && signature) {
        requestData.voteId = await AnonymousService.calcVoteId(signature, password ?? '0', election.id)
      }

      if (isIn && censusType === CensusType.WEIGHTED && !election.electionType.anonymous) {
        setVoted(await client.hasAlreadyVoted(requestData))
        // no need to check votes left if member ain't in census
        actions.votesLeft(await client.votesLeftCount(requestData))
      }

      setIsAbleToVote()
    } catch (e) {
      console.error('error in census fetch:', e)
      setErrors((prev) => ({ ...prev, census: errorToString(e) }))
      setLoading((prev) => ({ ...prev, census: false }))
      setLoaded((prev) => ({ ...prev, census: true }))
    }
  }, [actions, client, election, password, signature, setIsAbleToVote, setVoted, state.csp.token])

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
  }, [client.url, election, startProcessing, state.isAbleToVote, state.isInCensus, state.voted])

  // fetch anon circuits
  useEffect(() => {
    if (!election) return
    if (!(election instanceof PublishedElection)) return
    if (!election.census || election.census.type !== CensusType.ANONYMOUS) return
    if (isAnonCircuitsFetching.current || anonCircuitsFetched) return

    isAnonCircuitsFetching.current = true
    fetchAnonCircuits()
  }, [anonCircuitsFetched, election, fetchAnonCircuits])

  // set local client if no signer and we have CSP
  useEffect(() => {
    if (!state.csp.token || state.connected || !state.election) return

    const signer = generateSigner()
    client.wallet = signer
    actions.setClient(client)
  }, [state.connected, state.csp.token])

  // sets circuits in the anonymous service
  useEffect(() => {
    ;(async () => {
      if (!circuits) return
      setAnonCircuitsFetched(true)
      client.anonymousService.setCircuits(circuits)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [circuits])

  useEffect(() => {
    if (!id) return
    if (state.id && areEqualHexStrings(state.id, id)) return
    actions.load(id)
  }, [actions, id, state.id])

  useEffect(() => {
    if (!id || !client) return
    if (electionQuery.isFetching) {
      setLoading((prev) => ({ ...prev, election: true }))
    }
    if (electionQuery.data) {
      actions.set(electionQuery.data)
      setLoaded((prev) => ({ ...prev, election: true }))
      setLoading((prev) => ({ ...prev, election: false }))
    }
    if (electionQuery.isError) {
      setLoaded((prev) => ({ ...prev, election: true }))
      setLoading((prev) => ({ ...prev, election: false }))
      setErrors((prev) => ({ ...prev, election: errorToString(electionQuery.error) }))
    }
  }, [actions, client, electionQuery.data, electionQuery.error, electionQuery.isError, electionQuery.isFetching, id])

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
          (signature && !loaded.voted)
        )
      ) {
        return
      }

      await censusFetch()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchCensus,
    client,
    client.wallet,
    state.voter,
    loaded.election,
    loading.census,
    actions,
    state.isAbleToVote,
    signature,
    state.csp.token,
  ])

  // csp check sign info (check if voter already voted)
  useEffect(() => {
    if (!state.csp.token || !election || !loaded.election || election instanceof InvalidElection) return
    ;(async () => {
      try {
        actions.inCensus(true)
        const uri = new URL(election.census.censusURI)
        const endpoint = `${uri.protocol}//${uri.host}`
        let nullifier: string | null = null
        try {
          const signInfo = await fetchSignInfo({
            endpoint,
            authToken: state.csp.token,
            processId: election.id,
          })
          nullifier = signInfo.nullifier
        } catch (error) {
          const status = error?.status ?? error?.response?.status ?? error?.cause?.status
          if (Number(status) === 401) {
            const maxVoteOverwrites = election.voteType?.maxVoteOverwrites ?? 0
            actions.votesLeft(maxVoteOverwrites + 1)
            return
          }
          throw error
        }

        let voteInfo: VoteInfoResponse | null = null
        try {
          voteInfo = await client.voteService.info(nullifier)
        } catch (e) {
          voteInfo = null
        }

        const voteId = voteInfo?.voteID ?? null
        const overwriteCount = voteInfo?.overwriteCount ?? 0
        const maxVoteOverwrites = election.voteType?.maxVoteOverwrites ?? 0
        const votesLeft = voteId ? Math.max(0, maxVoteOverwrites - overwriteCount) : maxVoteOverwrites + 1

        actions.votesLeft(votesLeft)
        setVoted(voteId)
      } catch (e) {
        console.error('error in csp sign info check:', e)
      }
    })()
  }, [state.csp.token, election, loaded.election, setVoted, actions])

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
    setLoading((prev) => ({ ...prev, voting: true }))
    setErrors((prev) => ({ ...prev, voting: null }))
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
          setVoted(vid)
          break
        }
        case CensusType.ANONYMOUS:
        case CensusType.WEIGHTED: {
          const vid = await weightedVote(vote)
          setVoted(vid)
          break
        }
        default:
          throw new Error(`unsupported census type "${election.census.type}"`)
      }
      // refetch election info
      await fetchElection(election.id)
    } catch (e) {
      console.error('there was an error voting:', e)
      setErrors((prev) => ({ ...prev, voting: errorToString(e) }))
      setLoading((prev) => ({ ...prev, voting: false }))
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

  const { vote: voteDraft, ...stateRest } = state

  const wrappedActions = {
    ...actions,
    isAbleToVote: setIsAbleToVote,
    voted: setVoted,
    clear: () => {
      actions.clear()
      setLoading({ census: false, election: false, voting: false })
      setLoaded({ census: false, election: !!data, voted: false })
      setErrors({ census: null, election: null, voting: null })
    },
    error: (error: unknown) => {
      setErrors((prev) => ({ ...prev, election: errorToString(error) }))
      setLoading((prev) => ({ ...prev, election: false }))
      setLoaded((prev) => ({ ...prev, election: true }))
    },
    censusError: (error: unknown) => {
      setErrors((prev) => ({ ...prev, census: errorToString(error) }))
      setLoading((prev) => ({ ...prev, census: false }))
      setLoaded((prev) => ({ ...prev, census: true }))
    },
    votingError: (error: unknown) => {
      setErrors((prev) => ({ ...prev, voting: errorToString(error) }))
      setLoading((prev) => ({ ...prev, voting: false }))
    },
    load: (id?: string) => {
      actions.load(id)
      setLoading((prev) => ({ ...prev, election: true }))
      setErrors((prev) => ({ ...prev, election: null }))
    },
    loadCensus: (voter: string) => {
      actions.loadCensus(voter)
      setLoading((prev) => ({ ...prev, census: true }))
      setErrors((prev) => ({ ...prev, census: null }))
    },
    voting: () => {
      actions.voting()
      setLoading((prev) => ({ ...prev, voting: true }))
      setErrors((prev) => ({ ...prev, voting: null }))
    },
  }

  return {
    ...rest,
    ...stateRest,
    voteDraft,
    loading,
    loaded,
    errors,
    actions: wrappedActions,
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
