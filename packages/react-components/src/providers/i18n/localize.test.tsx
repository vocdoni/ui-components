import { renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { useLocalize } from './localize'
import { TestProvider } from '~providers/test-utils'

describe('useLocalize', () => {
  it('uses i18next namespace react-components', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <TestProvider>{children}</TestProvider>
    const { result } = renderHook(() => useLocalize(), { wrapper })

    expect(result.current('errors.unauthorized')).toBe('Not authorized to vote')
  })
})
