import { Wallet } from '@ethersproject/wallet'
import { render, renderHook, waitFor } from '@testing-library/react'
import { CensusType, EnvOptions, PublishedElection, VocdoniSDKClient, WeightedCensus } from '@vocdoni/sdk'
import { act } from 'react'
import { ClientProvider, useClient } from '../client'
import { fetchSignInfo } from '../csp'
import { TestProvider, onlyProps, properProps } from '../test-utils'
import { ElectionProvider, useElection } from './ElectionProvider'

vi.mock('../csp', () => ({
  fetchSignInfo: vi.fn(() =>
    Promise.resolve({
      address: '0x0',
      nullifier: '0xdeadbeef',
      at: new Date().toISOString(),
    })
  ),
  vote: vi.fn(),
}))

describe('<ElectionProvider />', () => {
  beforeEach(() => {
    localStorage.removeItem('csp_token')
    vi.mocked(fetchSignInfo).mockClear()
  })

  it('renders child elements', () => {
    const { getByText } = render(
      <TestProvider>
        <ClientProvider>
          <ElectionProvider>
            <p>is rendered</p>
          </ElectionProvider>
        </ClientProvider>
      </TestProvider>
    )

    expect(getByText('is rendered')).toBeInTheDocument()
  })

  it('fetches an election given an ID to the provider', async () => {
    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const { result } = renderHook(() => useElection(), {
      wrapper,
      initialProps: { id: '0xc5d2460186f73b259cfcf953772238dccf1d21605f00517933be020000000001' },
    })

    await waitFor(() => {
      expect(result.current.loaded.election).toBeTruthy()
    })

    expect((result.current.election as PublishedElection)?.title.default).toEqual('mocked process')
  })

  it('loads election via react-query and computes participation', async () => {
    const wrapper = (props: any) => (
      <TestProvider>
        <ClientProvider>
          <ElectionProvider {...properProps(props)} />
        </ClientProvider>
      </TestProvider>
    )

    const { result } = renderHook(() => useElection(), {
      wrapper,
      initialProps: { id: '0xc5d2460186f73b259cfcf953772238dccf1d21605f00517933be020000000001' },
    })

    await waitFor(() => expect(result.current.loaded.election).toBeTruthy())
    expect(result.current.participation).toBeGreaterThanOrEqual(0)
  })

  it('honors react-query refetch interval for elections', async () => {
    const client = new VocdoniSDKClient({ env: EnvOptions.STG })
    const fetchElection = vi.fn()
    client.fetchElection = fetchElection as any

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'refetch-election',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census: new WeightedCensus(),
    })

    fetchElection.mockResolvedValue(election)

    const wrapper = (props: any) => (
      <TestProvider>
        <ClientProvider {...onlyProps(props)}>
          <ElectionProvider {...properProps(props)} />
        </ClientProvider>
      </TestProvider>
    )

    const { result } = renderHook(() => useElection(), {
      wrapper,
      initialProps: { id: election.id, client, queryOptions: { refetchInterval: 50 } },
    })

    await waitFor(() => {
      expect(result.current.loaded.election).toBeTruthy()
    })
    expect(fetchElection.mock.calls.length).toBeGreaterThanOrEqual(1)

    await waitFor(() => {
      expect(fetchElection.mock.calls.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('ignores legacy autoUpdate settings when no queryOptions are provided', async () => {
    const client = new VocdoniSDKClient({ env: EnvOptions.STG })
    const fetchElection = vi.fn()
    client.fetchElection = fetchElection as any

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'refetch-election-auto',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census: new WeightedCensus(),
    })

    fetchElection.mockResolvedValue(election)

    const wrapper = (props: any) => (
      <TestProvider>
        <ClientProvider {...onlyProps(props)}>
          <ElectionProvider {...properProps(props)} />
        </ClientProvider>
      </TestProvider>
    )

    const { result } = renderHook(() => useElection(), {
      wrapper,
      initialProps: {
        id: election.id,
        client,
        ...({
          autoUpdate: true,
          autoUpdateInterval: 1000,
        } as any),
      } as any,
    })

    await waitFor(() => {
      expect(result.current.loaded.election).toBeTruthy()
    })
    expect(fetchElection).toHaveBeenCalledTimes(1)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    await waitFor(() => {
      expect(fetchElection).toHaveBeenCalledTimes(1)
    })
  })

  it('sets proper client from ClientProvider by default', async () => {
    const signer = Wallet.createRandom()
    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider>{props.children}</ElectionProvider>
          </ClientProvider>
        </TestProvider>
      )
    }

    const { result } = renderHook(() => useElection(), { wrapper, initialProps: { signer } })

    await waitFor(() => {
      expect(result.current.connected).toBeTruthy()
    })

    expect(result.current.client.wallet).toStrictEqual(signer)
  })

  it('can set and change signer at election level', () => {
    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })
    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider
              children={props.children}
              // @ts-ignore
              election={PublishedElection.build({
                title: 'test',
                description: 'test',
                endDate: new Date(),
                census: new WeightedCensus(),
                // census type must be different than "spreadsheet", otherwise won't change it
                meta: { census: { type: 'token' } },
              })}
            />
          </ClientProvider>
        </TestProvider>
      )
    }

    // we want to make checks using both hooks
    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    const { result } = renderHook(() => useBothHooks(), { wrapper, initialProps: { client } })

    expect(result.current.election.client.wallet).toStrictEqual(signer)

    const newsigner = Wallet.createRandom()
    const newclient = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: newsigner,
    })

    // change the client at election level
    act(() => {
      result.current.election.setClient(newclient)
    })

    // only the signer at election level should be affected
    expect(result.current.election.client.wallet).toStrictEqual(newsigner)
    // while the one at client level should remain the same
    expect(result.current.client.client.wallet).toStrictEqual(signer)
  })

  it('does not update client at election level for spreadsheet type census', async () => {
    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })
    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider
              children={props.children}
              // @ts-ignore
              election={PublishedElection.build({
                title: 'test',
                description: 'test',
                endDate: new Date(),
                census: new WeightedCensus(),
                // here we want it to be spreadsheet, since it's what we're testing
                meta: { census: { type: 'spreadsheet' } },
              })}
            />
          </ClientProvider>
        </TestProvider>
      )
    }

    // we want to make checks using both hooks, again
    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    const { result, rerender } = renderHook(() => useBothHooks(), { wrapper, initialProps: { client, signer } })

    await waitFor(() => {
      expect(result.current.client.connected).toBeTruthy()
    })

    // both should be properly defined to the base signer
    expect(result.current.client.client.wallet).toStrictEqual(signer)
    expect(result.current.election.client.wallet).toStrictEqual(signer)

    const newsigner = Wallet.createRandom()
    const newclient = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: newsigner,
    })

    // rerender with new client and signer
    rerender({ client: newclient, signer: newsigner })

    // client level has to change
    expect(result.current.client.client.wallet).toStrictEqual(newsigner)
    // but election level hasn't, since it's of type spreadsheet and we want to maintain the original one
    expect(result.current.election.client.wallet).toStrictEqual(signer)
  })

  it('properly sets and updates election metadata', () => {
    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'test',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census: new WeightedCensus(),
    })

    const { result, rerender } = renderHook(() => useElection(), { wrapper, initialProps: { election } })

    expect((result.current.election as PublishedElection)?.title.default).toBe('test')
    expect((result.current.election as PublishedElection)?.description.default).toBe('test')

    // @ts-ignore
    const newelection = PublishedElection.build({
      id: 'test2',
      title: 'test2',
      description: 'test2',
      endDate: new Date(),
      census: new WeightedCensus(),
    })

    rerender({ election: newelection })

    expect((result.current.election as PublishedElection)?.title.default).toBe('test2')
    expect((result.current.election as PublishedElection)?.description.default).toBe('test2')
  })

  it('clears session data on logout', async () => {
    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })
    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider signer={signer}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }
    // @ts-ignore
    const election = PublishedElection.build({
      id: 'test',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census: new WeightedCensus(),
      meta: { census: { type: 'spreadsheet' } },
    })

    // we need both hooks for this test
    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    var { result, rerender } = renderHook(() => useBothHooks(), { wrapper, initialProps: { election } })

    await waitFor(() => {
      expect(result.current.client.connected).toBeTruthy()
    })

    // client should be connected
    expect(result.current.client.connected).toBeTruthy()
    // but not the local one, since is of type spreadsheet
    expect(result.current.election.connected).toBeFalsy()

    await act(() => {
      // now we set the local one
      result.current.election.setClient(client)
    })

    // and then we should have the local session connected
    expect(result.current.election.connected).toBeTruthy()

    act(() => {
      result.current.client.clear()
    })

    // client should be cleared
    expect(result.current.client.connected).toBeFalsy()
    // but not election, since it's a spreadsheet one
    expect(result.current.election.connected).toBeTruthy()

    // @ts-ignore
    const nelection = PublishedElection.build({
      id: 'test2',
      title: 'test2',
      description: 'test2',
      endDate: new Date(),
      census: new WeightedCensus(),
      meta: { census: { type: 'token' } },
    })

    rerender({ election: nelection })

    // initialize again
    await act(() => {
      result.current.client.setClient(client)
      result.current.election.setClient(client)
    })

    expect(result.current.client.connected).toBeTruthy()
    expect(result.current.election.connected).toBeTruthy()

    // clear session
    await act(() => {
      result.current.client.clear()
    })

    // in this case both should be disconnected, since is not a spreadsheet type election
    expect(result.current.client.connected).toBeFalsy()
    expect(result.current.election.connected).toBeFalsy()
  })

  describe('participation and turnout calculations', () => {
    it('calculates participation correctly', () => {
      const wrapper = (props: any) => {
        return (
          <TestProvider>
            <ClientProvider>
              <ElectionProvider {...properProps(props)} />
            </ClientProvider>
          </TestProvider>
        )
      }

      // Test with census.size
      const census = new WeightedCensus()
      census.size = 100
      // @ts-ignore
      const electionWithCensus = PublishedElection.build({
        id: 'test',
        title: 'test',
        description: 'test',
        endDate: new Date(),
        census,
        voteCount: 50,
      })

      const { result, rerender } = renderHook(() => useElection(), {
        wrapper,
        initialProps: { election: electionWithCensus },
      })

      // Should be 50% (50 voters out of 100 total)
      expect(result.current.participation).toBe(50)

      // Test with maxCensusSize
      // @ts-ignore
      const electionWithMaxSize = PublishedElection.build({
        id: 'test2',
        title: 'test2',
        description: 'test2',
        endDate: new Date(),
        voteCount: 25,
        maxCensusSize: 50,
      })

      rerender({ election: electionWithMaxSize })

      // Should be 50% (25 voters out of 50 total)
      expect(result.current.participation).toBe(50)

      // Test with no census info
      // @ts-ignore
      const electionNoCensus = PublishedElection.build({
        id: 'test3',
        title: 'test3',
        description: 'test3',
        endDate: new Date(),
        voteCount: 50,
      })

      rerender({ election: electionNoCensus })

      // Should be 0 when no census info
      expect(result.current.participation).toBe(0)
    })

    describe('turnout calculations', () => {
      it('calculates turnout correctly for weighted voting', () => {
        const wrapper = (props: any) => {
          return (
            <TestProvider>
              <ClientProvider>
                <ElectionProvider {...properProps(props)} />
              </ClientProvider>
            </TestProvider>
          )
        }

        const census = new WeightedCensus()
        census.size = 100
        // @ts-ignore
        const weightedElection = PublishedElection.build({
          id: 'test',
          title: 'test',
          description: 'test',
          endDate: new Date(),
          census,
          results: [
            ['30', '20'],
            ['15', '10'],
          ], // Total votes: 75
        })

        const { result } = renderHook(() => useElection(), {
          wrapper,
          initialProps: { election: weightedElection },
        })

        // Should be 75% (75 total votes out of 100 census size)
        expect(result.current.turnout).toBe(75)
      })

      it('calculates turnout correctly for non-weighted voting', () => {
        const wrapper = (props: any) => {
          return (
            <TestProvider>
              <ClientProvider>
                <ElectionProvider {...properProps(props)} />
              </ClientProvider>
            </TestProvider>
          )
        }

        const census = new WeightedCensus()
        census.size = 100
        // @ts-ignore
        const nonWeightedElection = PublishedElection.build({
          id: 'test',
          title: 'test',
          description: 'test',
          endDate: new Date(),
          census,
          voteCount: 50,
        })

        const { result } = renderHook(() => useElection(), {
          wrapper,
          initialProps: { election: nonWeightedElection },
        })

        // Should be 50% (50 votes out of 100 census size)
        expect(result.current.turnout).toBe(50)
      })

      it('returns 0 for invalid election', () => {
        const wrapper = (props: any) => {
          return (
            <TestProvider>
              <ClientProvider>
                <ElectionProvider {...properProps(props)} />
              </ClientProvider>
            </TestProvider>
          )
        }

        // @ts-ignore
        const invalidElection = PublishedElection.build({
          id: 'test',
          title: 'test',
          description: 'test',
          endDate: new Date(),
        })

        const { result } = renderHook(() => useElection(), {
          wrapper,
          initialProps: { election: invalidElection },
        })

        expect(result.current.turnout).toBe(0)
      })
    })
  })

  it('marks CSP voters as in census when auth token is present', async () => {
    localStorage.setItem('csp_token', 'token')

    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })
    client.voteService.info = vi.fn().mockResolvedValue({ voteID: null, overwriteCount: 0 })

    const census = new WeightedCensus()
    census.type = CensusType.CSP
    census.censusURI = 'https://csp.example/api'

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'csp-election',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 0, maxCount: 1, maxValue: 1 },
    })

    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const { result } = renderHook(() => useElection(), {
      wrapper,
      initialProps: { election, fetchCensus: true, client, signer },
    })

    await waitFor(() => {
      expect(result.current.loaded.census).toBeTruthy()
    })

    expect(result.current.isInCensus).toBeTruthy()
    expect(result.current.isAbleToVote).toBeTruthy()
    expect(result.current.votesLeft).toBe(1)

    localStorage.removeItem('csp_token')
  })

  it('enables voting when CSP token is set after initial render and sign-info returns 401', async () => {
    vi.mocked(fetchSignInfo).mockRejectedValueOnce({ status: 401 })

    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
    })

    const census = new WeightedCensus()
    census.type = CensusType.CSP
    census.censusURI = 'https://csp.example/api'

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'csp-election-late-token',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 0, maxCount: 1, maxValue: 1 },
    })

    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const { result } = renderHook(() => useElection(), {
      wrapper,
      initialProps: { election, fetchCensus: true, client },
    })

    await act(async () => {
      result.current.actions.csp1('token')
    })

    await waitFor(() => {
      expect(result.current.votesLeft).toBe(1)
    })

    expect(result.current.isInCensus).toBeTruthy()
    expect(result.current.isAbleToVote).toBeTruthy()
  })

  it('treats 401 on CSP sign info as no prior vote', async () => {
    localStorage.setItem('csp_token', 'token')
    vi.mocked(fetchSignInfo).mockRejectedValueOnce({ status: 401 })

    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })

    const census = new WeightedCensus()
    census.type = CensusType.CSP
    census.censusURI = 'https://csp.example/api'

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'csp-election-401',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 0, maxCount: 1, maxValue: 1 },
    })

    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    const { result } = renderHook(() => useBothHooks(), {
      wrapper,
      initialProps: { election, client, signer, fetchCensus: true },
    })

    await waitFor(() => {
      expect(result.current.client.loaded.fetch).toBeTruthy()
    })

    await waitFor(() => {
      expect(result.current.election.votesLeft).toBe(1)
    })

    expect(result.current.election.voted).toBeNull()
    expect(result.current.election.loaded.voted).toBeFalsy()
    expect(result.current.election.votesLeft).toBe(1)
    expect(result.current.election.isAbleToVote).toBeTruthy()

    localStorage.removeItem('csp_token')
  })

  it('sets CSP votesLeft to 0 when vote exists and overwrites are disabled', async () => {
    localStorage.setItem('csp_token', 'token')

    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })
    client.voteService.info = vi.fn().mockResolvedValue({ voteID: 'vote-id', overwriteCount: 0 })

    const census = new WeightedCensus()
    census.type = CensusType.CSP
    census.censusURI = 'https://csp.example/api'

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'csp-election-voted',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 0, maxCount: 1, maxValue: 1 },
    })

    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    const { result } = renderHook(() => useBothHooks(), {
      wrapper,
      initialProps: { election, client, signer, fetchCensus: true },
    })

    await waitFor(() => {
      expect(result.current.client.loaded.fetch).toBeTruthy()
    })

    await waitFor(() => {
      expect(result.current.election.loaded.voted).toBeTruthy()
    })

    expect(result.current.election.voted).toBe('vote-id')
    expect(result.current.election.votesLeft).toBe(0)

    localStorage.removeItem('csp_token')
  })

  it('does not allow CSP voting when not in census even with token', async () => {
    localStorage.setItem('csp_token', 'token')

    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })
    client.voteService.info = vi.fn().mockResolvedValue({ voteID: null, overwriteCount: 0 })

    const census = new WeightedCensus()
    census.type = CensusType.CSP
    census.censusURI = 'https://csp.example/api'

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'csp-election-2',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 0, maxCount: 1, maxValue: 1 },
    })

    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    const { result } = renderHook(() => useBothHooks(), {
      wrapper,
      initialProps: { election, client, signer },
    })

    await waitFor(() => {
      expect(result.current.client.loaded.fetch).toBeTruthy()
    })

    act(() => {
      result.current.election.actions.inCensus(false)
      result.current.election.actions.isAbleToVote()
    })

    await waitFor(() => {
      expect(result.current.election.loaded.voted).toBeTruthy()
    })

    expect(result.current.election.isInCensus).toBeFalsy()
    expect(result.current.election.isAbleToVote).toBeFalsy()

    localStorage.removeItem('csp_token')
  })

  it('respects explicit isAbleToVote payload overrides', async () => {
    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })

    const census = new WeightedCensus()

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'weighted-election',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 0, maxCount: 1, maxValue: 1 },
    })

    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    const { result } = renderHook(() => useBothHooks(), {
      wrapper,
      initialProps: { election, client, signer },
    })

    await waitFor(() => {
      expect(result.current.client.loaded.fetch).toBeTruthy()
    })

    act(() => {
      result.current.election.actions.inCensus(true)
      result.current.election.actions.votesLeft(2)
      result.current.election.actions.isAbleToVote(false)
    })

    expect(result.current.election.isAbleToVote).toBeFalsy()
  })

  it('recalculates isAbleToVote on ElectionVoted with overwrites enabled', async () => {
    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })

    const census = new WeightedCensus()

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'weighted-election-overwrite',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 2, maxCount: 1, maxValue: 1 },
    })

    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    const { result } = renderHook(() => useBothHooks(), {
      wrapper,
      initialProps: { election, client, signer },
    })

    await waitFor(() => {
      expect(result.current.client.loaded.fetch).toBeTruthy()
    })

    act(() => {
      result.current.election.actions.inCensus(true)
      result.current.election.actions.votesLeft(2)
      result.current.election.actions.voting()
      result.current.election.actions.voted('vote-id')
    })

    expect(result.current.election.votesLeft).toBe(1)
    expect(result.current.election.isAbleToVote).toBeTruthy()
  })

  it('does not decrement votesLeft when ElectionVoted is called outside a voting flow', async () => {
    const signer = Wallet.createRandom()
    const client = new VocdoniSDKClient({
      env: EnvOptions.STG,
      wallet: signer,
    })

    const census = new WeightedCensus()

    // @ts-ignore
    const election = PublishedElection.build({
      id: 'weighted-election-no-voting',
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census,
      electionType: { anonymous: false },
      voteType: { maxVoteOverwrites: 2, maxCount: 1, maxValue: 1 },
    })

    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const useBothHooks = () => {
      return {
        election: useElection(),
        client: useClient(),
      }
    }

    const { result } = renderHook(() => useBothHooks(), {
      wrapper,
      initialProps: { election, client, signer },
    })

    await waitFor(() => {
      expect(result.current.client.loaded.fetch).toBeTruthy()
    })

    act(() => {
      result.current.election.actions.inCensus(true)
      result.current.election.actions.votesLeft(2)
      result.current.election.actions.voted('vote-id')
    })

    expect(result.current.election.votesLeft).toBe(2)
    expect(result.current.election.isAbleToVote).toBeTruthy()
  })

  describe('reducer behavior via provider', () => {
    const buildElection = (overrides: Partial<Record<string, any>> = {}) => {
      const census = new WeightedCensus()
      census.size = 10
      // @ts-ignore
      return PublishedElection.build({
        id: '0x0001',
        title: 'test',
        description: 'test',
        endDate: new Date(),
        census,
        electionType: { anonymous: false },
        voteType: { maxVoteOverwrites: 0, maxCount: 1, maxValue: 1 },
        voteCount: 2,
        ...overrides,
      })
    }

    const makeWrapper = () => {
      return (props: any) => (
        <TestProvider>
          <ClientProvider {...onlyProps(props)}>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    it('computes isAbleToVote when payload is undefined', async () => {
      const signer = Wallet.createRandom()
      const client = new VocdoniSDKClient({
        env: EnvOptions.STG,
        wallet: signer,
      })
      const election = buildElection()
      const wrapper = makeWrapper()

      const { result } = renderHook(() => useElection(), {
        wrapper,
        initialProps: { election, client, signer },
      })

      await waitFor(() => {
        expect(result.current.loaded.election).toBeTruthy()
      })

      act(() => {
        result.current.actions.votesLeft(1)
        result.current.actions.inCensus(true)
        result.current.actions.isAbleToVote()
      })

      expect(result.current.isAbleToVote).toBe(true)
    })

    it('clears CSP token on census clear', async () => {
      const signer = Wallet.createRandom()
      const client = new VocdoniSDKClient({
        env: EnvOptions.STG,
        wallet: signer,
      })
      const election = buildElection()
      const wrapper = makeWrapper()

      localStorage.setItem('csp_token', 'token')

      const { result } = renderHook(() => useElection(), {
        wrapper,
        initialProps: { election, client, signer },
      })

      await waitFor(() => {
        expect(result.current.loaded.election).toBeTruthy()
      })

      act(() => {
        result.current.actions.clear()
      })

      expect(localStorage.getItem('csp_token')).toBeNull()
      expect(result.current.isInCensus).toBe(false)
      expect(result.current.votesLeft).toBe(0)
    })

    it('persists CSP token on step 1', async () => {
      const signer = Wallet.createRandom()
      const client = new VocdoniSDKClient({
        env: EnvOptions.STG,
        wallet: signer,
      })
      const election = buildElection()
      const wrapper = makeWrapper()

      const { result } = renderHook(() => useElection(), {
        wrapper,
        initialProps: { election, client, signer },
      })

      await waitFor(() => {
        expect(result.current.loaded.election).toBeTruthy()
      })

      act(() => {
        result.current.actions.csp1('t1')
      })

      expect(result.current.csp.token).toBe('t1')
      expect(localStorage.getItem('csp_token')).toBe('t1')
    })

    it('marks voting in progress', async () => {
      const signer = Wallet.createRandom()
      const client = new VocdoniSDKClient({
        env: EnvOptions.STG,
        wallet: signer,
      })
      const election = buildElection()
      const wrapper = makeWrapper()

      const { result } = renderHook(() => useElection(), {
        wrapper,
        initialProps: { election, client, signer },
      })

      await waitFor(() => {
        expect(result.current.loaded.election).toBeTruthy()
      })

      act(() => {
        result.current.actions.voting()
      })

      expect(result.current.loading.voting).toBe(true)
      expect(result.current.voted).toBeNull()
    })

    it('stores vote draft', async () => {
      const signer = Wallet.createRandom()
      const client = new VocdoniSDKClient({
        env: EnvOptions.STG,
        wallet: signer,
      })
      const election = buildElection()
      const wrapper = makeWrapper()

      const { result } = renderHook(() => useElection(), {
        wrapper,
        initialProps: { election, client, signer },
      })

      await waitFor(() => {
        expect(result.current.loaded.election).toBeTruthy()
      })

      act(() => {
        result.current.actions.setVote({ value: 1 } as any)
      })

      expect(result.current.voteDraft).toEqual({ value: 1 })
    })

    it('finalizes voting without dropping votesLeft below zero', async () => {
      const signer = Wallet.createRandom()
      const client = new VocdoniSDKClient({
        env: EnvOptions.STG,
        wallet: signer,
      })
      const election = buildElection()
      const wrapper = makeWrapper()

      const { result } = renderHook(() => useElection(), {
        wrapper,
        initialProps: { election, client, signer },
      })

      await waitFor(() => {
        expect(result.current.loaded.election).toBeTruthy()
      })

      act(() => {
        result.current.actions.votesLeft(0)
        result.current.actions.inCensus(true)
        result.current.actions.voting()
        result.current.actions.voted('vote-id')
      })

      expect(result.current.votesLeft).toBe(0)
      expect(result.current.loaded.voted).toBe(true)
    })

    it('surfaces voting errors', async () => {
      const signer = Wallet.createRandom()
      const client = new VocdoniSDKClient({
        env: EnvOptions.STG,
        wallet: signer,
      })
      const election = buildElection()
      const wrapper = makeWrapper()

      const { result } = renderHook(() => useElection(), {
        wrapper,
        initialProps: { election, client, signer },
      })

      await waitFor(() => {
        expect(result.current.loaded.election).toBeTruthy()
      })

      act(() => {
        result.current.actions.votingError(new Error('vote failed'))
      })

      expect(result.current.errors.voting).toContain('vote failed')
      expect(result.current.voted).toBeNull()
    })
  })
})
