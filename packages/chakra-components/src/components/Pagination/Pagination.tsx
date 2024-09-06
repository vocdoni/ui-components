import { ButtonGroup, ButtonGroupProps, ButtonProps, InputProps, Text } from '@chakra-ui/react'
import { ReactElement, useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useLocalize, usePagination, useRoutedPagination } from '@vocdoni/react-providers'
import { PaginationResponse } from '@vocdoni/sdk'
import { useMultiStyleConfig, chakra } from '@chakra-ui/system'
import { EllipsisButton } from './EllipsisButton'
import { PaginatorButton } from './PaginatorButton'

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
  <PaginatorButton isActive={currentPage === page} {...rest}>
    {page + 1}
  </PaginatorButton>
)

const RoutedPageButton = ({ page, currentPage, to, ...rest }: PaginatorButtonProps & { to: string }) => (
  <PaginatorButton as={RouterLink} to={to} isActive={currentPage === page} {...rest}>
    {page + 1}
  </PaginatorButton>
)

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
  const styles = useMultiStyleConfig('Pagination')
  const t = useLocalize()

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
    <chakra.div __css={styles.wrapper}>
      <ButtonGroup sx={styles.buttonGroup} {...rest}>
        {totalPages === undefined ? (
          <>
            <PaginatorButton
              key='previous'
              onClick={() => goToPage(currentPage - 1)}
              isDisabled={currentPage === 0}
              {...buttonProps}
            >
              Previous
            </PaginatorButton>
            <PaginatorButton key='next' onClick={() => goToPage(currentPage + 1)} {...buttonProps}>
              Next
            </PaginatorButton>
          </>
        ) : (
          pages
        )}
      </ButtonGroup>
      {totalItems && (
        <Text sx={styles.totalResults}>
          {t('pagination.total_results', {
            count: totalItems,
          })}
        </Text>
      )}
    </chakra.div>
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
  const { getPathForPage, setPage, page } = useRoutedPagination()

  const totalPages = pagination.lastPage + 1
  const currentPage = page

  return (
    <PaginationButtons
      goToPage={(page) => setPage(page)}
      createPageButton={(i) => (
        <RoutedPageButton key={i} to={getPathForPage(i + 1)} page={i} currentPage={page} {...buttonProps} />
      )}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={pagination.totalItems}
      {...rest}
    />
  )
}
