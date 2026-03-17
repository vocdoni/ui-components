import { render, screen } from '@testing-library/react'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { Balance } from './Balance'

vi.mock('~providers', () => ({
  useClient: vi.fn(() => ({ balance: 42 })),
}))

vi.mock('~i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string, vars?: Record<string, unknown>) =>
    key === 'balance' ? `${vars?.balance} VOC tokens` : key,
}))

describe('Balance', () => {
  it('renders formatted balance', () => {
    render(
      <ComponentsProvider>
        <Balance />
      </ComponentsProvider>
    )

    expect(screen.getByText('42 VOC tokens')).toBeInTheDocument()
  })

  it('applies account balance slot override', () => {
    render(
      <ComponentsProvider
        components={{
          AccountBalance: ({ label, tone }) => (
            <span data-testid='balance-slot' data-tone={tone}>
              custom {label}
            </span>
          ),
        }}
      >
        <Balance />
      </ComponentsProvider>
    )

    expect(screen.getByTestId('balance-slot')).toHaveAttribute('data-tone', 'warning')
    expect(screen.getByText('custom 42 VOC tokens')).toBeInTheDocument()
  })
})
