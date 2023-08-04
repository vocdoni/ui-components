import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/alert'
import { ChakraProps } from '@chakra-ui/system'
import { CensusType, CspVote, PublishedElection, Vote, areEqualHexStrings } from '@vocdoni/sdk'
import { ComponentType, PropsWithChildren, createContext, useCallback, useContext, useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { useClient } from '../../client'
import { HR } from '../layout'
import { ElectionActions } from './Actions'
import { ElectionDescription } from './Description'
import { ElectionHeader } from './Header'
import { ElectionQuestions } from './Questions'
import { ElectionResults } from './Results'
import { ElectionSchedule } from './Schedule'
import { ElectionStatusBadge } from './StatusBadge'
import { ElectionTitle } from './Title'
import { VoteButton } from './VoteButton'
import { useElectionReducer } from './use-election-reducer'

export type ElectionProviderProps = {
  id?: string
  election?: PublishedElection
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
  const { client, csp, election, loading, loaded } = state

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

  // CSP OAuth flow
  // As vote setting and voting token are async, we need to wait for both to be set
  useEffect(() => {
    if (csp.token && state.vote) {
      cspVote(csp.token, state.vote)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [csp.token, state.vote])

  // fetch election
  useEffect(() => {
    if (!id || !client || loading.election) return
    if (loaded.election && areEqualHexStrings(state.id, id)) return

    fetchElection(id)
  }, [state.id, id, client, loading.election, loaded.election, fetchElection])

  // check census information
  useEffect(() => {
    if (!fetchCensus || !election || !loaded.election || loading.census || !client.wallet) return
    ;(async () => {
      const address = await client.wallet?.getAddress()
      // The condition is just negated so we can return the code execution.
      // A less mental option is to not negate the entire condition and add
      // the try/catch code inside the if
      if (
        !(
          !loaded.census ||
          !areEqualHexStrings(state.voter, address) ||
          (data && !areEqualHexStrings(data.id, election.id))
        )
      ) {
        return
      }

      try {
        actions.loadCensus(address as string)
        const isIn = await client.isInCensus(election.id)
        actions.inCensus(isIn)
        const censusType = election.census.type as CensusType

        if (isIn && censusType === CensusType.WEIGHTED) {
          actions.voted(await client.hasAlreadyVoted(election.id))

          // no need to check votes left if member ain't in census
          actions.votesLeft(await client.votesLeftCount(election.id))
        }
        actions.isAbleToVote()
      } catch (e) {
        actions.censusError(e)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCensus, client, state.voter, loaded.election, loading.census, actions, state.isAbleToVote])

  // auto update metadata (if enabled)
  useEffect(() => {
    if (!autoUpdate || !(election && election.id)) return

    const interval = setInterval(() => fetchElection(election.id), autoUpdateInterval || 30000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoUpdate, autoUpdateInterval, election])

  // CSP OAuth flow
  // Listening for the popup window meessage
  useEffect(() => {
    ;(async () => {
      const handleMessage = (event: any) => {
        if (event.data.code && event.data.handler) {
          getOAuthToken(event.data.code, event.data.handler)
        }
      }

      if (window.opener || !client || election?.census.type !== CensusType.CSP) {
        return
      }

      window.addEventListener('message', handleMessage)

      return () => {
        window.removeEventListener('message', handleMessage)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, election?.census.type])

  // CSP OAuth flow
  // Posting the message to the main window
  useEffect(() => {
    ;(async () => {
      if (typeof window == 'undefined') return
      if (window.location.href.split('?').length < 2) return

      const params: URLSearchParams = new URLSearchParams(window.location.search)
      const code: string | null = params.get('code')
      const handler: string | null = params.get('handler')
      if (!code || !handler) return

      if (window.opener) {
        // If it is, send the code to the parent window and close the popup
        window.opener.postMessage({ code, handler }, '*')
        window.close()
      }
    })()
  }, [])

  // context vote function (the one to be used with the given components)
  const vote = async (values: FieldValues) => {
    if (!client) {
      throw new Error('no client initialized')
    }
    if (!client.wallet) {
      throw new Error('no signer provided')
    }
    if (!election) {
      throw new Error('no election initialized')
    }

    actions.voting()

    client.setElectionId(election.id)
    // map questions back to expected Vote[] values
    const mapped = election.questions.map((q, k) => parseInt(values[k.toString()], 10))

    try {
      const vote = new Vote(mapped)
      actions.setVote(vote)
      if (typeof beforeSubmit === 'function' && !beforeSubmit(vote)) {
        return
      }

      switch (election.census.type) {
        case CensusType.CSP:
          await cspAuthAndVote()
          break
        case CensusType.WEIGHTED:
          const vid = await weightedVote(vote)
          actions.voted(vid)
          return vid

        default:
          throw new Error(`unsupported census type "${election.census.type}"`)
      }
    } catch (e) {
      actions.votingError(e)
    }
  }

  // internal method used by vote for weighted type votes
  const weightedVote = async (vote: Vote): Promise<string> => {
    if (!vote) {
      throw new Error('no vote instance')
    }
    if (election?.census.type !== CensusType.WEIGHTED) {
      throw new Error('not a Weighted election')
    }

    return await client.submitVote(vote)
  }

  // CSP OAuth flow
  const cspAuthAndVote = async () => {
    const {
      election,
      csp: { handler },
    } = state
    if (!client) {
      throw new Error('no client initialized')
    }
    if (!election) {
      throw new Error('no election initialized')
    }
    if (election.census.type !== CensusType.CSP) {
      throw new Error('not a CSP election')
    }

    const params: URLSearchParams = new URLSearchParams(window.location.search)
    if (!params.has('electionId')) {
      params.append('electionId', election.id)
    }

    if (!params.has('handler')) {
      params.append('handler', handler)
    }
    const redirectURL: string = `${window.location.origin}${window.location.pathname}?${params.toString()}${
      window.location.hash
    }`

    try {
      // TODO: properly type when ICspIntermediateStepResponse is exposed from SDK
      const step0: any = await client.cspStep(0, [handler, redirectURL])
      actions.csp0(step0.authToken)
      openLoginPopup(handler, step0['response'][0])
    } catch (e) {
      actions.votingError(e)
    }
  }

  // CSP OAuth flow
  // Opens a popup window to the service login page
  const openLoginPopup = (handler: string, url: string) => {
    const width = 600
    const height = 600
    const left = window.outerWidth / 2 - width / 2
    const top = window.outerHeight / 2 - height / 2
    const params = [
      `width=${width}`,
      `height=${height}`,
      `top=${top}`,
      `left=${left}`,
      `status=no`,
      `resizable=yes`,
      `scrollbars=yes`,
    ].join(',')

    window.open(url, handler, params)
  }

  // CSP OAuth flow
  const getOAuthToken = useCallback(
    async (code: string, handler: string) => {
      if (csp.token) {
        return
      }

      if (!code) {
        throw new Error('no code provided')
      }
      if (!handler) {
        throw new Error('no handler provided')
      }

      // Extract the electionId query param from the redirectURL
      const existingParams = new URLSearchParams(window.location.search)
      const electionId = existingParams.get('electionId')
      const params: URLSearchParams = new URLSearchParams()
      params.append('electionId', electionId as string)
      params.append('handler', handler)

      const redirectURL = `${window.location.origin}${window.location.pathname}?${params.toString()}${
        window.location.hash
      }`

      try {
        const step1: any = await client.cspStep(1, [handler, code, redirectURL], csp.authToken)
        actions.csp1(step1.token)
      } catch (e) {
        actions.votingError(localize('errors.unauthorized'))
        console.warn('CSP step 1 error', e)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [csp.token, csp.authToken, client]
  )

  // CSP OAuth flow
  const cspVote = async (token: string, vote: Vote) => {
    if (!client) {
      throw new Error('no client initialized')
    }

    if (election?.census.type !== CensusType.CSP) {
      throw new Error('not a CSP election')
    }

    try {
      const walletAddress: string = (await client.wallet?.getAddress()) as string
      const signature: string = await client.cspSign(walletAddress, token)
      const cspVote: CspVote = client.cspVote(vote as Vote, signature)
      const vid: string = await client.submitVote(cspVote)
      actions.voted(vid)
    } catch (e) {
      actions.votingError(e)
    }
  }

  return {
    ...rest,
    ...state,
    fetchElection,
    setClient: actions.setClient,
    localize,
    vote,
  }
}

export type ElectionState = ReturnType<typeof useElectionProvider>

export const ElectionContext = createContext<ElectionState | undefined>(undefined)

export const useElection = () => {
  const ctxt = useContext(ElectionContext)
  if (!ctxt) {
    throw new Error(
      'useElection returned `undefined`, maybe you forgot to wrap the component within <ElectionProvider />?'
    )
  }

  return ctxt
}

export type ElectionProviderComponentProps = ElectionProviderProps & ChakraProps

export const ElectionProvider = ({ children, ...rest }: PropsWithChildren<ElectionProviderComponentProps>) => {
  const value = useElectionProvider(rest)

  return <ElectionContext.Provider value={value}>{children}</ElectionContext.Provider>
}
ElectionProvider.displayName = 'ElectionProvider'

export const Election = (props: ElectionProviderComponentProps) => (
  <ElectionProvider {...props} fetchCensus>
    <ElectionBody />
  </ElectionProvider>
)
Election.displayName = 'Election'

// Not exported since we're not allowing it to be configured. If you want to customize it past
// this level, create a custom Election component with the provided election components.
const ElectionBody = () => {
  const {
    errors: { election: error },
  } = useElection()

  if (error) {
    return (
      <Alert status='error'>
        <AlertIcon />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <>
      <ElectionHeader />
      <ElectionTitle />
      <ElectionSchedule />
      <ElectionStatusBadge />
      <ElectionActions />
      <ElectionDescription />
      <HR />
      <ElectionQuestions />
      <VoteButton />
      <ElectionResults />
    </>
  )
}
