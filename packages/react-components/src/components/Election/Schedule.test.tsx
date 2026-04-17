import { act, render, screen } from '@testing-library/react'
import { ElectionStatus, EnvOptions, PublishedElection, WeightedCensus } from '@vocdoni/sdk'
import { ComponentProps } from 'react'
import { hydrateRoot, Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ElectionSchedule } from '~components/Election/Schedule'
import { ClientProvider } from '~providers/client'
import { ElectionProvider } from '~providers/election/ElectionProvider'
import { TestProvider } from '~providers/test-utils'

const createElection = () =>
  JSON.parse(
    JSON.stringify(
      // @ts-ignore
      PublishedElection.build({
        id: '0x123',
        title: 'Schedule test election',
        status: ElectionStatus.UPCOMING,
        startDate: '2026-01-03T00:00:00.000Z',
        endDate: '2026-12-31T00:00:00.000Z',
        creationTime: '2025-12-01T00:00:00.000Z',
        census: new WeightedCensus(),
      })
    )
  )

const renderSchedule = (props?: Partial<ComponentProps<typeof ElectionSchedule>>) => (
  <TestProvider>
    <ComponentsProvider>
      <ClientProvider env={EnvOptions.DEV}>
        <ElectionProvider election={createElection()}>
          <ElectionSchedule {...props} />
        </ElectionProvider>
      </ClientProvider>
    </ComponentsProvider>
  </TestProvider>
)

describe('ElectionSchedule', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('server-renders a deterministic UTC range during the hydration render', () => {
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const html = renderToString(renderSchedule({ format: 'PPp' }))

    expect(html).toContain('Voting from 2026-01-03T00:00:00.000Z to 2026-12-31T00:00:00.000Z')
  })

  it('avoids hydration mismatches when remaining time changes between server and client renders', async () => {
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))

    const html = renderToString(renderSchedule({ showRemaining: true }))
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.setSystemTime(new Date('2026-01-02T00:00:00.000Z'))

    let root: Root | undefined
    await act(async () => {
      root = hydrateRoot(container, renderSchedule({ showRemaining: true }))
      await Promise.resolve()
    })

    expect(consoleSpy).not.toHaveBeenCalled()
    expect(container.textContent).toBe('in 1 day')

    await act(async () => {
      root?.unmount()
    })
  })

  it('renders relative time immediately for client-only renders', () => {
    vi.setSystemTime(new Date('2026-01-02T00:00:00.000Z'))

    render(renderSchedule({ showRemaining: true }))

    expect(screen.getByText('in 1 day')).toBeInTheDocument()
  })
})
