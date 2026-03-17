import { fireEvent, render, screen } from '@testing-library/react'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { EllipsisButton } from './EllipsisButton'

vi.mock('~i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string) => key === 'pagination.page_placeholder' ? 'Page #' : key,
}))

describe('EllipsisButton', () => {
  it('opens input and submits typed page on Enter', () => {
    const gotoPage = vi.fn()

    render(
      <ComponentsProvider>
        <EllipsisButton gotoPage={gotoPage} />
      </ComponentsProvider>
    )

    fireEvent.click(screen.getByRole('button'))

    const input = screen.getByPlaceholderText('Page #')
    fireEvent.change(input, { target: { value: '3' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(gotoPage).toHaveBeenCalledWith(3)
  })
})
