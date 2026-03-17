import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { SpreadsheetAccessSlotProps } from '~components/context/types'
import { SpreadsheetAccess } from './SpreadsheetAccess'

const state = vi.hoisted(() => ({
  election: null as any,
  connected: false,
  clearClient: vi.fn(),
  setClient: vi.fn(),
  sikPassword: vi.fn(),
  sikSignature: vi.fn(),
  isInCensus: true,
  chainServiceUrl: 'https://api-chain.localhost',
  sdkClientCtorCalls: [] as Array<Record<string, unknown>>,
  walletFromRow: vi.fn(() => ({
    privateKey: '0xprivate',
    address: '0xaddress',
    getAddress: vi.fn(async () => '0xaddress'),
  })),
  electionService: {
    getNumericElectionId: vi.fn(async () => 42),
    getElectionSalt: vi.fn(async () => 'salt-from-service'),
  },
}))

const { PublishedElection, VocdoniSDKClient } = vi.hoisted(() => {
  class PublishedElection {
    id = '0xelection'
    organizationId = '0xorg'
    electionType: { anonymous: boolean }
    private data: Record<string, any>

    constructor({ anonymous = false, data = {} }: { anonymous?: boolean; data?: Record<string, any> }) {
      this.electionType = { anonymous }
      this.data = data
    }

    get(path: string) {
      return this.data[path]
    }
  }

  class VocdoniSDKClient {
    constructor(params: Record<string, unknown>) {
      state.sdkClientCtorCalls.push(params)
    }

    isInCensus = vi.fn(async () => state.isInCensus)
    anonymousService = {
      signSIKPayload: vi.fn(async () => 'signature'),
      fetchAccountSIK: vi.fn(async () => false),
      hasRegisteredSIK: vi.fn(async () => true),
    }
  }

  return { PublishedElection, VocdoniSDKClient }
})

vi.mock('@ethersproject/wallet', () => ({
  Wallet: class Wallet {},
}))

vi.mock('@vocdoni/sdk', () => ({
  PublishedElection,
  VocdoniSDKClient,
}))

vi.mock('~providers', () => ({
  errorToString: (error: unknown) => String(error),
  walletFromRow: (salt: unknown, values: unknown[]) => (state.walletFromRow as any)(salt, values),
  useClient: () => ({ env: 'dev' }),
  useElection: () => ({
    connected: state.connected,
    clearClient: state.clearClient,
    election: state.election,
    client: {
      electionService: state.electionService,
      chainService: { url: state.chainServiceUrl },
    },
    setClient: state.setClient,
    sikPassword: state.sikPassword,
    sikSignature: state.sikSignature,
  }),
}))

vi.mock('~i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string, options?: Record<string, unknown>) =>
    key === 'validation.min_length' ? `validation.min_length:${String(options?.min)}` : key,
}))

const SpreadsheetSlot = ({
  connected,
  open,
  onOpen,
  onSubmit,
  onLogout,
  fields,
  anonymousField,
  formError,
}: SpreadsheetAccessSlotProps) => {
  if (connected) {
    return <button onClick={onLogout}>logout</button>
  }

  if (!open) {
    return <button onClick={onOpen}>open</button>
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      {fields.map((field) => (
        <label key={field.id}>
          {field.label}
          <input aria-label={field.label} {...field.inputProps} {...field.inputAttrs} />
          {field.error ? <span>{field.error}</span> : null}
        </label>
      ))}
      {anonymousField ? (
        <label>
          {anonymousField.label}
          <input aria-label={anonymousField.label} {...anonymousField.inputProps} {...anonymousField.inputAttrs} />
          {anonymousField.error ? <span>{anonymousField.error}</span> : null}
        </label>
      ) : null}
      {formError ? <span>{formError}</span> : null}
      <button type='submit'>submit</button>
    </form>
  )
}

const renderSpreadsheetAccess = () =>
  render(
    <ComponentsProvider components={{ SpreadsheetAccess: SpreadsheetSlot }}>
      <SpreadsheetAccess />
    </ComponentsProvider>
  )

describe('SpreadsheetAccess', () => {
  it('submits with valid values using visible registered fields', async () => {
    state.setClient.mockClear()
    state.walletFromRow.mockClear()
    state.sdkClientCtorCalls = []
    state.election = new PublishedElection({
      data: {
        'census.type': 'spreadsheet',
        'census.fields': ['Email', 'Code'],
        'census.specs': {
          Code: { pattern: { value: '^\\d+$', message: 'digits_only' } },
        },
        'census.salt': 'salt-fixed',
      },
    })

    renderSpreadsheetAccess()

    fireEvent.click(screen.getByRole('button', { name: 'open' }))
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'hello@example.com' } })
    fireEvent.change(screen.getByLabelText('Code'), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(state.walletFromRow).toHaveBeenCalledWith('salt-fixed', ['hello@example.com', '1234'])
    })
    expect(state.sdkClientCtorCalls.at(-1)).toMatchObject({
      env: 'dev',
      electionId: '0xelection',
      api_url: state.chainServiceUrl,
    })

    expect(screen.queryByText('validation.required')).not.toBeInTheDocument()
  })

  it('shows required validation errors when fields are empty', async () => {
    state.election = new PublishedElection({
      data: {
        'census.type': 'spreadsheet',
        'census.fields': ['Name', 'Email'],
        'census.specs': {},
      },
    })

    renderSpreadsheetAccess()

    fireEvent.click(screen.getByRole('button', { name: 'open' }))
    fireEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(screen.getAllByText('validation.required')).toHaveLength(2)
    })
  })

  it('shows custom pattern message instead of required when value is present but invalid', async () => {
    state.setClient.mockClear()
    state.election = new PublishedElection({
      data: {
        'census.type': 'spreadsheet',
        'census.fields': ['Code'],
        'census.specs': {
          Code: { pattern: { value: '^\\d+$', message: 'digits_only' } },
        },
      },
    })

    renderSpreadsheetAccess()

    fireEvent.click(screen.getByRole('button', { name: 'open' }))
    fireEvent.change(screen.getByLabelText('Code'), { target: { value: 'abc' } })
    fireEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(screen.getByText('digits_only')).toBeInTheDocument()
    })

    expect(state.setClient).not.toHaveBeenCalled()
  })

  it('validates anonymous sik password min length', async () => {
    state.election = new PublishedElection({
      anonymous: true,
      data: {
        'census.type': 'spreadsheet',
        'census.fields': ['Email'],
        'census.specs': {},
      },
    })

    renderSpreadsheetAccess()

    fireEvent.click(screen.getByRole('button', { name: 'open' }))
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'hello@example.com' } })
    fireEvent.change(screen.getByLabelText('spreadsheet.anon_sik_label'), { target: { value: 'short' } })
    fireEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(screen.getByText('validation.min_length:8')).toBeInTheDocument()
    })
  })

  it('shows form-level wrong data error when generated wallet is not in census', async () => {
    state.setClient.mockClear()
    state.isInCensus = false
    state.election = new PublishedElection({
      data: {
        'census.type': 'spreadsheet',
        'census.fields': ['Email', 'Code'],
        'census.specs': {},
      },
    })

    renderSpreadsheetAccess()

    fireEvent.click(screen.getByRole('button', { name: 'open' }))
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'hello@example.com' } })
    fireEvent.change(screen.getByLabelText('Code'), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: 'submit' }))

    await waitFor(() => {
      expect(screen.getByText('errors.wrong_data_description')).toBeInTheDocument()
    })
    expect(state.setClient).not.toHaveBeenCalled()
  })

  it('does not reuse a hash-derived private key after logout', async () => {
    state.connected = true
    state.setClient.mockClear()
    state.clearClient.mockClear()
    state.sdkClientCtorCalls = []
    state.election = new PublishedElection({
      data: {
        'census.type': 'spreadsheet',
        'census.fields': ['Email'],
        'census.specs': {},
      },
    })
    window.location.hash = '#0xprivate'

    const view = renderSpreadsheetAccess()

    await waitFor(() => {
      expect(state.setClient).toHaveBeenCalledTimes(1)
    })

    state.setClient.mockClear()
    fireEvent.click(screen.getByRole('button', { name: 'logout' }))

    expect(state.clearClient).toHaveBeenCalledTimes(1)
    expect(window.location.hash).toBe('')

    state.election = new PublishedElection({
      data: {
        'census.type': 'spreadsheet',
        'census.fields': ['Email'],
        'census.specs': {},
      },
    })

    view.rerender(
      <ComponentsProvider components={{ SpreadsheetAccess: SpreadsheetSlot }}>
        <SpreadsheetAccess />
      </ComponentsProvider>
    )

    await waitFor(() => {
      expect(state.setClient).not.toHaveBeenCalled()
    })
  })
})
