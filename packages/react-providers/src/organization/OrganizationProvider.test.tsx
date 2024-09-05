import { render, renderHook, waitFor } from '@testing-library/react'
import { Account, AccountData } from '@vocdoni/sdk'
import { ClientProvider } from '../client'
import { properProps } from '../test-utils'
import { OrganizationProvider, useOrganization } from './OrganizationProvider'

describe('<OrganizationProvider />', () => {
  it('renders child elements', () => {
    const { getByText } = render(
      <ClientProvider>
        <OrganizationProvider>
          <p>is rendered</p>
        </OrganizationProvider>
      </ClientProvider>
    )

    expect(getByText('is rendered')).toBeInTheDocument()
  })

  it('properly sets and updates organization metadata', () => {
    const wrapper = (props: any) => {
      return (
        <ClientProvider>
          <OrganizationProvider {...properProps(props)} />
        </ClientProvider>
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
        <ClientProvider>
          <OrganizationProvider {...properProps(props)} />
        </ClientProvider>
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
})
