import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ElectionTitle } from './Title'

vi.mock('../../providers', () => ({
  useElection: vi.fn(() => ({ election: { id: '0x1', title: { default: 'My Election' } } })),
}))

vi.mock('@vocdoni/sdk', () => ({
  PublishedElection: class PublishedElection {},
}))

describe('ElectionTitle', () => {
  it('renders election title', () => {
    render(
      <ComponentsProvider>
        <ElectionTitle />
      </ComponentsProvider>
    )

    expect(screen.getByText('0x1')).toBeInTheDocument()
  })
})
