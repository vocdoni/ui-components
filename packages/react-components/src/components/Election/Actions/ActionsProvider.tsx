import { ActionsProvider as RActionsProvider } from '@vocdoni/react-providers'
import { PropsWithChildren } from 'react'

export const ActionsProvider = ({ children }: PropsWithChildren) => <RActionsProvider>{children}</RActionsProvider>
