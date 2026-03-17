import { render, screen } from '@testing-library/react'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ElectionTitle } from './Title'

vi.mock('~providers', () => ({
  useElection: vi.fn(() => ({ election: { id: '0x1', title: { default: 'My Election' } } })),
}))

vi.mock('@vocdoni/sdk', () => ({
  PublishedElection: class PublishedElection {},
  InvalidElection: class InvalidElection {},
}))

describe('ElectionTitle', () => {
  it('renders election title from serialized election data', () => {
    render(
      <ComponentsProvider>
        <ElectionTitle />
      </ComponentsProvider>
    )

    expect(screen.getByText('My Election')).toBeInTheDocument()
  })
})
