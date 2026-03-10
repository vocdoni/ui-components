import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { Button } from './Button'

describe('Pagination Button', () => {
  it('renders a button with active marker', () => {
    render(
      <ComponentsProvider>
        <Button isActive>2</Button>
      </ComponentsProvider>
    )

    expect(screen.getByRole('button')).toHaveAttribute('data-active')
  })
})
