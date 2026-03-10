import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { VoteButton } from './VoteButton'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

vi.mock('../../providers', () => ({
  useClient: vi.fn(() => ({ connected: true })),
  useElection: vi.fn(() => ({
    client: { wallet: {} },
    connected: true,
    loading: { voting: false },
    ConnectButton: null,
    isAbleToVote: true,
    election: {
      id: '0xabc',
      status: 'ONGOING',
      electionType: { anonymous: false },
    },
    voted: false,
    sik: { signature: '' },
    sikSignature: vi.fn(),
  })),
}))

vi.mock('@vocdoni/sdk', () => ({
  ElectionStatus: {
    ONGOING: 'ONGOING',
    ENDED: 'ENDED',
    RESULTS: 'RESULTS',
  },
  InvalidElection: class InvalidElection {},
}))

describe('VoteButton', () => {
  it('renders submit vote button when election is ongoing', () => {
    render(
      <ComponentsProvider>
        <VoteButton />
      </ComponentsProvider>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
