import { usePagination, useRoutedPagination } from '@vocdoni/react-providers'
import { PaginationResponse } from '@vocdoni/sdk'
import { ComponentPropsWithoutRef, ReactElement, useMemo } from 'react'
import { useReactComponentsLocalize } from '../../i18n/localize'
import { useComponents } from '../context/useComponents'
import { Button, ButtonProps } from './Button'
import { EllipsisButton } from './EllipsisButton'

export type PaginationProps = ComponentPropsWithoutRef<'div'> &
  Record<string, unknown> & {
    maxButtons?: number | false
    buttonProps?: ButtonProps
    inputProps?: ComponentPropsWithoutRef<'input'>
  } & PaginationResponse

type CreatePageButtonType = (i: number) => ReactElement

type GotoPageType = (page: number) => void

const usePaginationPages = (
  currentPage: number,
  totalPages: number | undefined,
  maxButtons: number | undefined | false,
  gotoPage: GotoPageType,
  createPageButton: CreatePageButtonType,
  inputProps?: ComponentPropsWithoutRef<'input'>,
  buttonProps?: ButtonProps
) =>
  useMemo(() => {
    if (totalPages === undefined) return []

    const pages: ReactElement[] = []
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

    const sideButtons = 2
    const availableButtons = maxButtons - sideButtons

    if (currentPage <= availableButtons / 2) {
      return [...pages.slice(0, availableButtons), endEllipsis, pages[totalPages - 1]]
    }

    if (currentPage >= totalPages - 1 - availableButtons / 2) {
      return [pages[0], startEllipsis, ...pages.slice(totalPages - availableButtons, totalPages)]
    }

    const startPage = currentPage - Math.floor((availableButtons - 1) / 2)
    const endPage = currentPage + Math.floor(availableButtons / 2)
    return [pages[0], startEllipsis, ...pages.slice(startPage, endPage - 1), endEllipsis, pages[totalPages - 1]]
  }, [totalPages, maxButtons, gotoPage, inputProps, buttonProps, currentPage, createPageButton])

const PaginationButtons = ({
  totalPages,
  totalItems,
  currentPage,
  goToPage,
  createPageButton,
  maxButtons = 10,
  buttonProps,
  inputProps,
  ...rest
}: {
  totalPages: number | undefined
  totalItems: number | undefined
  currentPage: number
  createPageButton: CreatePageButtonType
  goToPage: GotoPageType
  maxButtons?: number | false
  buttonProps?: ButtonProps
  inputProps?: ComponentPropsWithoutRef<'input'>
} & ComponentPropsWithoutRef<'div'>) => {
  const { PaginationContainer, PaginationSummary } = useComponents()
  const t = useReactComponentsLocalize()

  const pages = usePaginationPages(
    currentPage,
    totalPages,
    maxButtons ? Math.max(5, maxButtons) : false,
    (page) => {
      if (page >= 0 && totalPages && page < totalPages) {
        goToPage(page)
      }
    },
    createPageButton,
    inputProps,
    buttonProps
  )

  return (
    <PaginationContainer
      {...rest}
      items={
        <>
          {totalPages === undefined ? (
            <>
              <Button
                key='previous'
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
                {...buttonProps}
              >
                {t('pagination.previous')}
              </Button>
              <Button key='next' onClick={() => goToPage(currentPage + 1)} {...buttonProps}>
                {t('pagination.next')}
              </Button>
            </>
          ) : (
            pages
          )}
          {Boolean(totalItems) ? (
            <PaginationSummary
              text={t('pagination.total_results', {
                count: totalItems,
              })}
            />
          ) : null}
        </>
      }
    />
  )
}

export const Pagination = ({ maxButtons = 10, buttonProps, inputProps, pagination, ...rest }: PaginationProps) => {
  const { page, setPage, initialPage } = usePagination()

  const totalPages = initialPage === 0 ? pagination.lastPage + 1 : pagination.lastPage
  const currentPage = initialPage === 0 ? page - 1 : page

  return (
    <PaginationButtons
      goToPage={(nextPage) => setPage(nextPage)}
      createPageButton={(i) => {
        const pageIndex = initialPage === 0 ? i : i + initialPage
        return (
          <Button key={i} onClick={() => setPage(pageIndex)} isActive={currentPage === pageIndex} {...buttonProps}>
            {i + 1}
          </Button>
        )
      }}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={pagination.totalItems}
      maxButtons={maxButtons}
      buttonProps={buttonProps}
      inputProps={inputProps}
      {...rest}
    />
  )
}

export const RoutedPagination = ({
  maxButtons = 10,
  buttonProps,
  inputProps,
  pagination,
  ...rest
}: PaginationProps) => {
  const { getPathForPage, setPage, page, initialPage } = useRoutedPagination()

  const totalPages = initialPage === 0 ? pagination.lastPage + 1 : pagination.lastPage
  const currentPage = initialPage === 0 ? page - 1 : page

  return (
    <PaginationButtons
      goToPage={(nextPage) => setPage(nextPage + 1)}
      createPageButton={(i) => {
        const pageIndex = initialPage === 0 ? i : i + initialPage
        return (
          <Button key={i} href={getPathForPage(i + 1)} isActive={currentPage === pageIndex} {...buttonProps}>
            {i + 1}
          </Button>
        )
      }}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={pagination.totalItems}
      maxButtons={maxButtons}
      buttonProps={buttonProps}
      inputProps={inputProps}
      {...rest}
    />
  )
}
