import { Wallet } from '@ethersproject/wallet'
import { render, renderHook, waitFor } from '@testing-library/react'
import { Account, VocdoniCensus3Client } from '@vocdoni/sdk'
import { act } from 'react'
import { ApiUrl, CensusUrls, properProps } from '../test-utils'
import { ClientProvider, useClient } from './ClientProvider'

describe('<ClientProvider />', () => {
  it('renders child elements', () => {
    const { getByText } = render(
      <ClientProvider>
        <p>is rendered</p>
      </ClientProvider>
    )

    expect(getByText('is rendered')).toBeInTheDocument()
  })

  it('has expected defaults defined if no props are passed', () => {
    const wrapper = (props: any) => <ClientProvider {...properProps(props)} />
    const { result } = renderHook(() => useClient(), {
      wrapper,
    })

    expect(result.current.env).toBe('prod')

    // no signer is passed, so none should be defined
    expect(result.current.signer).toBeUndefined()
    expect(result.current.client.wallet).toBeUndefined()
    expect(result.current.connected).toBeFalsy()

    // and there should be no account connected either
    expect(result.current.account).toBeUndefined()

    // ensures prod is taken by default in the client
    expect(result.current.client.url).toEqual(ApiUrl.prod)

    // check census3 client is setup
    expect(result.current.census3).not.toBeUndefined()
    expect(result.current.census3).toBeInstanceOf(VocdoniCensus3Client)
    expect(result.current.census3.url).not.toBeUndefined()
  })

  it('sets proper environment', () => {
    const wrapper = (props: any) => <ClientProvider {...properProps(props)} />
    const { result, rerender } = renderHook(() => useClient(), {
      wrapper,
      initialProps: { env: 'stg' },
    })

    expect(result.current.env).toBe('stg')
    expect(result.current.client.url).toEqual(ApiUrl.stg)
    expect(result.current.census3.url).toEqual(CensusUrls.stg)

    // change it to dev
    rerender({ env: 'dev' })

    expect(result.current.env).toBe('dev')
    // ensure other related instances are updated too
    expect(result.current.client.url).toEqual(ApiUrl.dev)
    expect(result.current.census3.url).toEqual(CensusUrls.dev)
  })

  it('sets proper signer', async () => {
    const signer = Wallet.createRandom()
    const wrapper = (props: any) => <ClientProvider {...properProps(props)} />
    const { result, rerender } = renderHook(() => useClient(), {
      wrapper,
      initialProps: { signer, env: 'dev' },
    })

    await waitFor(() => {
      expect(result.current.connected).toBeTruthy()
    })

    expect(result.current.signer).toEqual(signer)
    expect(result.current.client.wallet).toEqual(signer)

    const newsigner = Wallet.createRandom()

    // @ts-ignore
    rerender({ signer: newsigner })

    await waitFor(() => {
      expect(result.current.client.wallet).toEqual(newsigner)
    })

    expect(result.current.signer).not.toEqual(signer)
    expect(result.current.signer).toEqual(newsigner)
    // ensure env has not changed after changing the signer
    expect(result.current.env).toEqual('dev')
    expect(result.current.client.url).toEqual(ApiUrl.dev)
  })

  it('fetches an account', async () => {
    const wrapper = (props: any) => <ClientProvider {...properProps(props)} />
    const signer = Wallet.createRandom()
    const { result } = renderHook(() => useClient(), {
      wrapper,
      initialProps: { env: 'dev', signer },
    })

    expect(result.current.loaded.fetch).toBeFalsy()

    // fetch account request is mocked, so we're actually not creating accounts, just fetching them
    await act(async () => {
      await result.current.fetchAccount()
    })

    await waitFor(() => {
      expect(result.current.loaded.fetch).toBeTruthy()
    })

    expect(result.current.loading.fetch).toBeFalsy()
    expect(result.current.account).not.toBeUndefined()
    expect(result.current.errors.fetch).toBeNull()
  })

  it('creates an account', async () => {
    const wrapper = (props: any) => <ClientProvider {...properProps(props)} />
    const signer = Wallet.createRandom()
    const { result } = renderHook(() => useClient(), {
      wrapper,
      initialProps: { env: 'dev', signer },
    })

    expect(result.current.loaded.create).toBeFalsy()

    // fetch account request is mocked, so we're actually not creating accounts, just fetching them
    await act(async () => {
      await result.current.createAccount()
    })

    await waitFor(() => {
      expect(result.current.loaded.create).toBeTruthy()
    })

    expect(result.current.loading.create).toBeFalsy()
    expect(result.current.account).not.toBeUndefined()
    expect(result.current.errors.create).toBeNull()
  })

  it('updates an account', async () => {
    const wrapper = (props: any) => <ClientProvider {...properProps(props)} />
    const signer = Wallet.createRandom()
    const { result } = renderHook(() => useClient(), {
      wrapper,
      initialProps: { env: 'dev', signer },
    })

    expect(result.current.loaded.create).toBeFalsy()

    // fetch account request is mocked, so we're actually not creating accounts, just fetching them
    await act(async () => {
      await result.current.createAccount()
    })

    await waitFor(() => {
      expect(result.current.loaded.create).toBeTruthy()
    })

    // now we update it
    await act(async () => {
      await result.current.updateAccount(new Account({ name: 'tests' }))
    })

    await waitFor(() => {
      expect(result.current.loaded.update).toBeTruthy()
    })

    expect(result.current.loading.update).toBeFalsy()
    expect(result.current.account).not.toBeUndefined()
    expect(result.current.errors.update).toBeNull()
  })

  it('properly clears session data', async () => {
    const wrapper = (props: any) => <ClientProvider {...properProps(props)} />
    const signer = Wallet.createRandom()
    const { result } = renderHook(() => useClient(), {
      wrapper,
      initialProps: { env: 'dev', signer },
    })

    // fetch account request is mocked, so we're actually not creating accounts, just fetching them
    await act(async () => {
      await result.current.createAccount()
    })

    await waitFor(() => {
      expect(result.current.loaded.create).toBeTruthy()
    })

    expect(result.current.connected).toBeTruthy()
    expect(result.current.balance).not.toEqual(-1)

    // clear session data
    await act(() => {
      result.current.clear()
    })

    expect(result.current.connected).toBeFalsy()
    expect(result.current.client.wallet).toBeUndefined()
    expect(result.current.signer).toStrictEqual(null)
    expect(result.current.balance).toEqual(-1)
  })
})
