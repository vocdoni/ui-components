import { Wallet } from '@ethersproject/wallet'
import { render, renderHook, waitFor } from '@testing-library/react'
import { EnvOptions, PublishedElection, VocdoniSDKClient, WeightedCensus } from '@vocdoni/sdk'
import { act } from 'react'
import { ClientProvider, useClient } from '../client'
import { onlyProps, properProps } from '../test-utils'
import { ElectionProvider, useElection } from './ElectionProvider'

describe('<ElectionProvider />', () => {
  it('renders child elements', () => {
    const { getByText } = render(
      <ClientProvider>
        <ElectionProvider>
          <p>is rendered</p>
        </ElectionProvider>
      </ClientProvider>
    )

    expect(getByText('is rendered')).toBeInTheDocument()
  })

  it('fetches an election given an ID to the provider', async () => {
    const wrapper = (props: any) => {
      return (
        <ClientProvider>
          <ElectionProvider {...properProps(props)} />
        </ClientProvider>
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

  it('sets proper client from ClientProvider by default', async () => {
    const signer = Wallet.createRandom()
    const wrapper = (props: any) => {
      return (
        <ClientProvider {...onlyProps(props)}>
          <ElectionProvider>{props.children}</ElectionProvider>
        </ClientProvider>
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
        <ClientProvider>
          <ElectionProvider {...properProps(props)} />
        </ClientProvider>
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
        <ClientProvider signer={signer}>
          <ElectionProvider {...properProps(props)} />
        </ClientProvider>
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
          <ClientProvider>
            <ElectionProvider {...properProps(props)} />
          </ClientProvider>
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
            <ClientProvider>
              <ElectionProvider {...properProps(props)} />
            </ClientProvider>
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
            <ClientProvider>
              <ElectionProvider {...properProps(props)} />
            </ClientProvider>
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
            <ClientProvider>
              <ElectionProvider {...properProps(props)} />
            </ClientProvider>
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
})
