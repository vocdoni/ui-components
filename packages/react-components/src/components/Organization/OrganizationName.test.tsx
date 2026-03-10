import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { OrganizationName } from './Name'

vi.mock('../../providers', () => ({
  useOrganization: vi.fn(() => ({
    organization: {
      address: '0xorg',
      account: { name: { default: 'Org Name' } },
    },
  })),
}))

describe('OrganizationName', () => {
  it('renders organization name', () => {
    render(
      <ComponentsProvider>
        <OrganizationName />
      </ComponentsProvider>
    )

    expect(screen.getByText('Org Name')).toBeInTheDocument()
  })
})
