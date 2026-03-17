import { fireEvent, render, screen } from '@testing-library/react'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { Pagination } from './Pagination'

const setPage = vi.fn()

vi.mock('~providers/pagination/PaginationProvider', () => ({
  usePagination: vi.fn(() => ({ page: 1, setPage, initialPage: 0 })),
}))

vi.mock('~i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string, vars?: Record<string, unknown>) => {
    if (key === 'pagination.total_results') return `Showing a total of ${vars?.count} results`
    if (key === 'pagination.previous') return 'Previous'
    if (key === 'pagination.next') return 'Next'
    if (key === 'pagination.page_placeholder') return 'Page #'
    return key
  },
}))

describe('Pagination', () => {
  it('renders pages and summary', () => {
    render(
      <ComponentsProvider>
        <Pagination pagination={{ currentPage: 1, previousPage: 0, nextPage: 2, totalItems: 20, lastPage: 3 }} />
      </ComponentsProvider>
    )

    expect(screen.getByText('Showing a total of 20 results')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('navigates when page button is clicked', () => {
    render(
      <ComponentsProvider>
        <Pagination pagination={{ currentPage: 1, previousPage: 0, nextPage: 2, totalItems: 20, lastPage: 3 }} />
      </ComponentsProvider>
    )

    fireEvent.click(screen.getByText('2'))
    expect(setPage).toHaveBeenCalled()
  })
})
