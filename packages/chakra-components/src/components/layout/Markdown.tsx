import { chakra } from '@chakra-ui/system'
import { PropsWithChildren, Suspense, lazy } from 'react'
import { Options } from 'react-markdown'

const MarkdownRenderer = lazy(() => import('./MarkdownRenderer'))

export type MarkdownProps = Options &
  PropsWithChildren<{
    plain?: boolean
  }>

const MD = ({ children, plain, ...rest }: MarkdownProps) => {
  if (!children) {
    return null
  }

  if (plain) return <>{children}</>

  return (
    <Suspense fallback={<>Burriloadin</>}>
      <MarkdownRenderer {...rest}>{children}</MarkdownRenderer>
    </Suspense>
  )
}

export const Markdown = chakra(MD)
Markdown.displayName = 'Markdown'
