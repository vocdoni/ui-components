import { render, screen } from '@testing-library/react'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ElectionStatusBadge } from './StatusBadge'

const state = vi.hoisted(() => ({
  election: undefined as any,
}))

vi.mock('~providers', () => ({
  useElection: () => ({
    election: state.election,
  }),
}))

vi.mock('~i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string) => key,
}))

const BadgeSlot = ({ label, tone }: { label: string; tone: string }) => <span>{`${tone}:${label}`}</span>

describe('ElectionStatusBadge', () => {
  it('uses the invalid label for invalid elections even when a status exists', () => {
    state.election = {
      status: 'PROCESS_UNKNOWN',
    }

    render(
      <ComponentsProvider components={{ ElectionStatusBadge: BadgeSlot as any }}>
        <ElectionStatusBadge />
      </ComponentsProvider>
    )

    expect(screen.getByText('danger:statuses.invalid')).toBeInTheDocument()
  })
})
