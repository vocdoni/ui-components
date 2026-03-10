import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ConfirmModal } from './ConfirmModal'
import { ConfirmContext } from './ConfirmProvider'

describe('ConfirmModal', () => {
  it('delegates modal rendering to ConfirmShell slot', () => {
    const slotSpy = vi.fn()

    render(
      <ConfirmContext.Provider
        value={{
          prompt: <span>slot content</span>,
          isOpen: true,
          proceed: vi.fn(),
          cancel: vi.fn(),
          confirm: vi.fn(async () => true),
        }}
      >
        <ComponentsProvider
          components={{
            ConfirmShell: ({ isOpen, content }) => {
              slotSpy({ isOpen, content })
              return <div>{content}</div>
            },
          }}
        >
          <ConfirmModal />
        </ComponentsProvider>
      </ConfirmContext.Provider>
    )

    expect(slotSpy).toHaveBeenCalledWith(expect.objectContaining({ isOpen: true, content: expect.any(Object) }))
    expect(screen.getByText('slot content')).toBeInTheDocument()
  })

  it('passes onClose callback that triggers cancel', () => {
    const cancel = vi.fn()

    render(
      <ConfirmContext.Provider
        value={{
          prompt: <span>confirm me</span>,
          isOpen: true,
          proceed: vi.fn(),
          cancel,
          confirm: vi.fn(async () => true),
        }}
      >
        <ComponentsProvider
          components={{
            ConfirmShell: ({ onClose }) => <button onClick={onClose}>close</button>,
          }}
        >
          <ConfirmModal />
        </ComponentsProvider>
      </ConfirmContext.Provider>
    )

    fireEvent.click(screen.getByText('close'))
    expect(cancel).toHaveBeenCalledTimes(1)
  })
})
