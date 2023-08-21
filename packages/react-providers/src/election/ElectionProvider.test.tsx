import { Wallet } from '@ethersproject/wallet'
import { act, render, renderHook, waitFor } from '@testing-library/react'
import { EnvOptions, PublishedElection, VocdoniSDKClient, WeightedCensus } from '@vocdoni/sdk'
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

    expect(result.current.election?.title.default).toEqual('mocked process')
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
            election={PublishedElection.from({
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
            election={PublishedElection.from({
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

    const election = PublishedElection.from({
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census: new WeightedCensus(),
    })
    // @ts-ignore
    election.id = 'test'

    const { result, rerender } = renderHook(() => useElection(), { wrapper, initialProps: { election } })

    expect(result.current.election?.title.default).toBe('test')
    expect(result.current.election?.description.default).toBe('test')

    const newelection = PublishedElection.from({
      title: 'test2',
      description: 'test2',
      endDate: new Date(),
      census: new WeightedCensus(),
    })
    // ids must change in order for the data to be actually updated
    // @ts-ignore
    election.id = 'test2'

    rerender({ election: newelection })

    expect(result.current.election?.title.default).toBe('test2')
    expect(result.current.election?.description.default).toBe('test2')
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
    const election = PublishedElection.from({
      title: 'test',
      description: 'test',
      endDate: new Date(),
      census: new WeightedCensus(),
      meta: { census: { type: 'spreadsheet' } },
    })
    // @ts-ignore
    election.id = 'test'

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

    const nelection = PublishedElection.from({
      title: 'test2',
      description: 'test2',
      endDate: new Date(),
      census: new WeightedCensus(),
      meta: { census: { type: 'token' } },
    })
    // @ts-ignore
    election.id = 'test2'

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
})
