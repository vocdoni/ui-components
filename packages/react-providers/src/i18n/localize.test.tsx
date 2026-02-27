import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { TestProvider } from '../test-utils'
import { useLocalize } from './localize'

describe('useLocalize', () => {
  it('uses i18next namespace react-providers', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <TestProvider>{children}</TestProvider>
    const { result } = renderHook(() => useLocalize(), { wrapper })

    expect(result.current('errors.unauthorized')).toBe('Not authorized to vote')
  })
})
