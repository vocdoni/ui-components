import { PaginationResponse } from '@vocdoni/sdk'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { generatePath, useLocation, useNavigate, useParams } from 'react-router-dom'

export type PaginationContextProps = {
  page: number
  setPage: (page: number) => void
  pagination: PaginationResponse['pagination']
}

export type RoutedPaginationContextProps = Omit<PaginationContextProps, 'setPage'> & {
  path: string
  pagination: PaginationResponse['pagination']
  // Util function that generates the path for a given page
  // (it return the actual path with queryParams and other route params but changing the page)
  getPathForPage: (page: number, queryParams?: string) => string
  setPage: (page: number, queryParams?: string) => void
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined)
const RoutedPaginationContext = createContext<RoutedPaginationContextProps | undefined>(undefined)

export const usePagination = (): PaginationContextProps => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider')
  }
  return context
}

export const useRoutedPagination = (): RoutedPaginationContextProps => {
  const context = useContext(RoutedPaginationContext)
  if (!context) {
    throw new Error('useRoutedPagination must be used within a RoutedPaginationProvider')
  }
  return context
}

export type PaginationProviderProps = {
  pagination: PaginationResponse['pagination']
}

export type RoutedPaginationProviderProps = PaginationProviderProps & {
  path: string
}

export const RoutedPaginationProvider = ({
  path,
  pagination,
  ...rest
}: PropsWithChildren<RoutedPaginationProviderProps>) => {
  const { search } = useLocation()
  const { page, ...extraParams }: { page?: number } = useParams()
  const p = page && page > 0 ? page - 1 : 0

  const navigate = useNavigate()

  const getPathForPage = (page: number, queryParams?: string) => {
    const p = queryParams || search
    return generatePath(path, { page, ...extraParams }) + p
  }

  const setPage = (page: number, queryParams?: string) => {
    navigate(getPathForPage(page, queryParams))
  }

  return <RoutedPaginationContext.Provider value={{ page: p, path, getPathForPage, setPage, pagination }} {...rest} />
}

export const PaginationProvider = ({ pagination, ...rest }: PropsWithChildren<PaginationProviderProps>) => {
  const [page, setPage] = useState<number>(0)

  return <PaginationContext.Provider value={{ page, setPage, pagination }} {...rest} />
}
