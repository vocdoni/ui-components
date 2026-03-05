import { Wallet } from '@ethersproject/wallet'
import { act, render, renderHook, waitFor } from '@testing-library/react'
import { Account, AccountData, EnvOptions, VocdoniSDKClient } from '@vocdoni/sdk'
import { ClientProvider, useClient } from '../client'
import { properProps, TestProvider } from '../test-utils'
import { OrganizationProvider, useOrganization } from './OrganizationProvider'

describe('<OrganizationProvider />', () => {
  const baseOrganization: AccountData = {
    account: new Account({
      name: 'testing',
    }),
    address: '0xB38492889D136054A29EC37B238Cc8bBF4f3DEe7',
    balance: 0,
    electionIndex: 0,
    nonce: 0,
    feesCount: 0,
    sik: '',
    transfersCount: 0,
  }

  it('renders child elements', () => {
    const { getByText } = render(
      <TestProvider>
        <ClientProvider>
          <OrganizationProvider>
            <p>is rendered</p>
          </OrganizationProvider>
        </ClientProvider>
      </TestProvider>
    )

    expect(getByText('is rendered')).toBeInTheDocument()
  })

  it('properly sets and updates organization metadata', () => {
    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider>
            <OrganizationProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const organization: AccountData = {
      account: new Account({
        name: 'testing',
      }),
      address: '0xB38492889D136054A29EC37B238Cc8bBF4f3DEe7',
      balance: 0,
      electionIndex: 0,
      nonce: 0,
      feesCount: 0,
      sik: '',
      transfersCount: 0,
    }

    const { result, rerender } = renderHook(() => useOrganization(), { wrapper, initialProps: { organization } })

    expect(result.current.organization?.account.name.default).toBe('testing')
    expect(result.current.organization?.address).toEqual('0xB38492889D136054A29EC37B238Cc8bBF4f3DEe7')

    const neworg: AccountData = {
      account: new Account({
        name: 'testing2',
      }),
      address: '0xde0F66E999db9927cc31acABED5cEd80a926d4b7',
      balance: 0,
      electionIndex: 0,
      nonce: 0,
      feesCount: 0,
      sik: '',
      transfersCount: 0,
    }

    rerender({ organization: neworg })

    expect(result.current.organization?.account.name.default).toBe('testing2')
    expect(result.current.organization?.address).toEqual('0xde0F66E999db9927cc31acABED5cEd80a926d4b7')
  })

  it('fetches an account given an ID to the provider', async () => {
    const wrapper = (props: any) => {
      return (
        <TestProvider>
          <ClientProvider>
            <OrganizationProvider {...properProps(props)} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const { result } = renderHook(() => useOrganization(), {
      wrapper,
      initialProps: { id: '0xde0F66E999db9927cc31acABED5cEd80a926d4b7' },
    })

    await waitFor(() => {
      expect(result.current.loaded).toBeTruthy()
    })

    expect(result.current.errors.load).toBeNull()
    expect(result.current.organization?.account.name.default).toEqual('testing account')
  })

  it('fetches organization via react-query', async () => {
    const wrapper = (props: any) => (
      <TestProvider>
        <ClientProvider signer={props.signer}>
          <OrganizationProvider {...properProps(props)} />
        </ClientProvider>
      </TestProvider>
    )

    const { result } = renderHook(() => useOrganization(), {
      wrapper,
    })

    await act(async () => result.current.fetch('0x123'))

    await waitFor(() => expect(result.current.organization).toBeDefined())
  })

  it('honors react-query refetch interval for organizations', async () => {
    const client = new VocdoniSDKClient({ env: EnvOptions.STG })
    client.fetchAccount = vi.fn().mockResolvedValue(baseOrganization) as any

    const wrapper = (props: any) => {
      const providerProps = properProps(props)
      return (
        <TestProvider>
          <ClientProvider client={providerProps.client}>
            <OrganizationProvider {...providerProps} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const { result } = renderHook(() => useOrganization(), {
      wrapper,
      initialProps: {
        id: baseOrganization.address,
        client,
        queryOptions: { refetchInterval: 100 },
      },
    })

    await waitFor(() => {
      expect(result.current.loaded).toBeTruthy()
      expect(client.fetchAccount).toHaveBeenCalledTimes(1)
    })

    await waitFor(() => {
      expect(client.fetchAccount).toHaveBeenCalledTimes(2)
    })
  })

  it('merges updates without losing existing fields', async () => {
    const signer = Wallet.createRandom()
    const orgWithSigner = {
      ...baseOrganization,
      address: signer.address,
    }
    const client = new VocdoniSDKClient({ env: EnvOptions.STG })
    client.fetchAccount = vi.fn().mockResolvedValue(orgWithSigner) as any
    client.updateAccountInfo = vi.fn().mockResolvedValue({
      ...orgWithSigner,
      balance: 42,
    }) as any
    const wrapper = (props: any) => {
      const providerProps = properProps(props)
      return (
        <TestProvider>
          <ClientProvider signer={providerProps.signer} client={providerProps.client}>
            <OrganizationProvider {...providerProps} />
          </ClientProvider>
        </TestProvider>
      )
    }

    const useBothHooks = () => ({
      organization: useOrganization(),
      client: useClient(),
    })

    const { result } = renderHook(() => useBothHooks(), {
      wrapper,
      initialProps: { organization: orgWithSigner, signer, client },
    })

    await act(async () => {
      await result.current.client.fetchAccount()
      await result.current.organization.update({ balance: 42 } as any)
    })

    await waitFor(() => {
      expect(result.current.organization.organization?.balance).toBe(42)
      expect(result.current.organization.organization?.address).toBe(orgWithSigner.address)
    })
  })

  it('surfaces update errors', async () => {
    const signer = Wallet.createRandom()
    const orgWithSigner = {
      ...baseOrganization,
      address: signer.address,
    }
    const wrapper = (props: any) => (
      <TestProvider>
        <ClientProvider>
          <OrganizationProvider {...properProps(props)} />
        </ClientProvider>
      </TestProvider>
    )

    const useBothHooks = () => ({
      organization: useOrganization(),
      client: useClient(),
    })

    const { result } = renderHook(() => useBothHooks(), {
      wrapper,
      initialProps: { organization: orgWithSigner, signer },
    })

    act(() => {
      result.current.client.setSigner(signer)
    })

    result.current.client.client.fetchAccount = vi.fn().mockResolvedValue(orgWithSigner)
    result.current.client.client.updateAccountInfo = vi.fn().mockRejectedValue(new Error('update failed'))

    await act(async () => {
      await result.current.client.fetchAccount()
      await result.current.organization.update({ balance: 42 } as any).catch(() => undefined)
    })

    await waitFor(() => expect(result.current.organization.errors.update).toContain('update failed'))
  })
})
