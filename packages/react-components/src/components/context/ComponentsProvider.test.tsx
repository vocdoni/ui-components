import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from './ComponentsProvider'
import { useComponents } from './useComponents'

const Probe = () => {
  const { ElectionTitle: Title } = useComponents()
  return <Title title='hello' />
}

describe('ComponentsProvider', () => {
  it('uses defaults when no overrides are provided', () => {
    render(
      <ComponentsProvider>
        <Probe />
      </ComponentsProvider>
    )

    expect(screen.getByText('hello').tagName).toBe('H1')
  })

  it('allows partial overrides', () => {
    render(
      <ComponentsProvider
        components={{
          ElectionTitle: ({ title }) => <h2 data-testid='custom-title'>{title}</h2>,
        }}
      >
        <Probe />
      </ComponentsProvider>
    )

    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
  })

  it('throws when hook is used outside provider', () => {
    const onWindowError = (event: Event) => event.preventDefault()
    window.addEventListener('error', onWindowError)
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      expect(() => render(<Probe />)).toThrow('useComponents must be used within a <ComponentsProvider />')
    } finally {
      spy.mockRestore()
      window.removeEventListener('error', onWindowError)
    }
  })
})
