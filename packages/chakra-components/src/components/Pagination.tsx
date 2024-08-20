import { Button, ButtonGroup, ButtonGroupProps, ButtonProps, Input, InputProps, Text } from '@chakra-ui/react'
import { ReactElement, useMemo, useState } from 'react'
import { generatePath, Link as RouterLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePagination, useRoutedPagination } from '@vocdoni/react-providers'
import { PaginationResponse } from '@vocdoni/sdk'
import { Trans } from 'react-i18next'

export type PaginationProps = ButtonGroupProps & {
  maxButtons?: number | false
  buttonProps?: ButtonProps
  inputProps?: InputProps
} & PaginationResponse

type PaginatorButtonProps = {
  page: number
  currentPage: number
} & ButtonProps

const PageButton = ({ page, currentPage, ...rest }: PaginatorButtonProps) => (
  <Button isActive={currentPage === page} {...rest}>
    {page + 1}
  </Button>
)

const RoutedPageButton = ({ page, currentPage, to, ...rest }: PaginatorButtonProps & { to: string }) => (
  <Button as={RouterLink} to={to} isActive={currentPage === page} {...rest}>
    {page + 1}
  </Button>
)

type EllipsisButtonProps = ButtonProps & {
  gotoPage: (page: number) => void
  inputProps?: InputProps
}

const EllipsisButton = ({ gotoPage, inputProps, ...rest }: EllipsisButtonProps) => {
  const [ellipsisInput, setEllipsisInput] = useState(false)

  if (ellipsisInput) {
    return (
      <Input
        placeholder='Page #'
        width='50px'
        {...inputProps}
        onKeyDown={(e) => {
          if (e.target instanceof HTMLInputElement && e.key === 'Enter') {
            const pageNumber = Number(e.target.value)
            gotoPage(pageNumber)
            setEllipsisInput(false)
          }
        }}
        onBlur={() => setEllipsisInput(false)}
        autoFocus
      />
    )
  }

  return (
    <Button
      as='a'
      href='#goto-page'
      {...rest}
      onClick={(e) => {
        e.preventDefault()
        setEllipsisInput(true)
      }}
    >
      ...
    </Button>
  )
}

type CreatePageButtonType = (i: number) => ReactElement
type GotoPageType = (page: number) => void

const usePaginationPages = (
  currentPage: number,
  totalPages: number | undefined,
  maxButtons: number | undefined | false,
  gotoPage: GotoPageType,
  createPageButton: CreatePageButtonType,
  inputProps?: InputProps,
  buttonProps?: ButtonProps
) => {
  return useMemo(() => {
    if (totalPages === undefined) return []

    let pages: ReactElement[] = []

    // Create an array of all page buttons
    for (let i = 0; i < totalPages; i++) {
      pages.push(createPageButton(i))
    }

    if (!maxButtons || totalPages <= maxButtons) {
      return pages
    }

    const startEllipsis = (
      <EllipsisButton key='start-ellipsis' gotoPage={gotoPage} inputProps={inputProps} {...buttonProps} />
    )
    const endEllipsis = (
      <EllipsisButton key='end-ellipsis' gotoPage={gotoPage} inputProps={inputProps} {...buttonProps} />
    )

    // Add ellipsis and slice the array accordingly
    const sideButtons = 2 // First and last page
    const availableButtons = maxButtons - sideButtons // Buttons we can distribute around the current page

    if (currentPage <= availableButtons / 2) {
      // Near the start
      return [...pages.slice(0, availableButtons), endEllipsis, pages[totalPages - 1]]
    } else if (currentPage >= totalPages - 1 - availableButtons / 2) {
      // Near the end
      return [pages[0], startEllipsis, ...pages.slice(totalPages - availableButtons, totalPages)]
    } else {
      // In the middle
      const startPage = currentPage - Math.floor((availableButtons - 1) / 2)
      const endPage = currentPage + Math.floor(availableButtons / 2)
      return [pages[0], startEllipsis, ...pages.slice(startPage, endPage - 1), endEllipsis, pages[totalPages - 1]]
    }
  }, [currentPage, totalPages, maxButtons, gotoPage])
}

const PaginationButtons = ({
  totalPages,
  totalItems,
  currentPage,
  goToPage,
  createPageButton,
  maxButtons = 10,
  buttonProps,
  ...rest
}: {
  totalPages: number | undefined
  totalItems: number | undefined
  currentPage: number
  createPageButton: CreatePageButtonType
  goToPage: GotoPageType
} & ButtonGroupProps &
  Pick<PaginationProps, 'maxButtons' | 'buttonProps'>) => {
  const pages = usePaginationPages(
    currentPage,
    totalPages,
    maxButtons ? Math.max(5, maxButtons) : false,
    (page) => {
      if (page >= 0 && totalPages && page < totalPages) {
        goToPage(page)
      }
    },
    createPageButton
  )

  return (
    <>
      <ButtonGroup flexWrap={'wrap'} rowGap={2} {...rest}>
        {totalPages === undefined ? (
          <>
            <Button
              key='previous'
              onClick={() => goToPage(currentPage - 1)}
              isDisabled={currentPage === 0}
              {...buttonProps}
            >
              Previous
            </Button>
            <Button key='next' onClick={() => goToPage(currentPage + 1)} {...buttonProps}>
              Next
            </Button>
          </>
        ) : (
          pages
        )}
      </ButtonGroup>
      {totalItems && (
        <Text color={'lighterText'}>
          <Trans i18nKey={'filters.total_results'} count={totalItems}>
            Showing a total of {{ count: totalItems }} results
          </Trans>
        </Text>
      )}
    </>
  )
}

export const Pagination = ({ maxButtons = 10, buttonProps, inputProps, pagination, ...rest }: PaginationProps) => {
  const { setPage } = usePagination()
  const totalPages = pagination.lastPage + 1
  const page = pagination.currentPage

  return (
    <PaginationButtons
      goToPage={(page) => setPage(page)}
      createPageButton={(i) => (
        <PageButton key={i} page={i} currentPage={page} onClick={() => setPage(i)} {...buttonProps} />
      )}
      currentPage={page}
      totalPages={totalPages}
      totalItems={pagination.totalItems}
      maxButtons={maxButtons}
      {...rest}
    />
  )
}

export const RoutedPagination = ({ maxButtons = 10, buttonProps, pagination, ...rest }: PaginationProps) => {
  const { path } = useRoutedPagination()
  const { search } = useLocation()
  const { page, ...extraParams }: { page?: number } = useParams()
  const navigate = useNavigate()

  const totalPages = pagination.lastPage + 1

  const currentPage = pagination.currentPage

  const _generatePath = (page: number) => generatePath(path, { page, ...extraParams }) + search

  return (
    <PaginationButtons
      goToPage={(page) => navigate(_generatePath(page))}
      createPageButton={(i) => (
        <RoutedPageButton key={i} to={_generatePath(i + 1)} page={i} currentPage={currentPage} {...buttonProps} />
      )}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={pagination.totalItems}
      maxButtons={maxButtons}
      {...rest}
    />
  )
}
