import { PropsWithChildren } from 'react'
import { ActionsProvider as RActionsProvider } from '~providers'

export const ActionsProvider = ({ children }: PropsWithChildren) => <RActionsProvider>{children}</RActionsProvider>
