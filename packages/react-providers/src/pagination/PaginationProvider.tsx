import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

export type PaginationContextProps = {
  page: number
  setPage: (page: number) => void
}

export type RoutedPaginationContextProps = Omit<PaginationContextProps, 'setPage'> & {
  path: string
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

export type PaginationProviderProps = {}

export type RoutedPaginationProviderProps = PaginationProviderProps & {
  path: string
}

export const RoutedPaginationProvider = ({ path, ...rest }: PropsWithChildren<RoutedPaginationProviderProps>) => {
  const { page }: { page?: number } = useParams()
  const p = page && page > 0 ? page - 1 : 0

  return <RoutedPaginationContext.Provider value={{ page: p, path }} {...rest} />
}

export const PaginationProvider = ({ ...rest }: PropsWithChildren<PaginationProviderProps>) => {
  const [page, setPage] = useState<number>(0)

  return <PaginationContext.Provider value={{ page, setPage }} {...rest} />
}
