import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ElectionResults } from './Results'

const state = vi.hoisted(() => ({
  election: null as any,
}))

const { PublishedElection, ElectionStatus, ElectionResultsTypeNames } = vi.hoisted(() => {
  class PublishedElection {}

  return {
    PublishedElection,
    ElectionStatus: {
      RESULTS: 'RESULTS',
      CANCELED: 'CANCELED',
    },
    ElectionResultsTypeNames: {
      MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    },
  }
})

vi.mock('@vocdoni/sdk', () => ({
  PublishedElection,
  ElectionStatus,
  ElectionResultsTypeNames,
  dotobject: (obj: Record<string, unknown>, path: string) => {
    if (!obj) return undefined
    if (path === 'description') return obj.description
    if (path === 'image.default' && typeof obj.image === 'object' && obj.image) {
      return (obj.image as { default?: string }).default
    }
    return undefined
  },
  formatUnits: () => '0',
}))

vi.mock('~providers', () => ({
  useElection: () => ({
    election: state.election,
  }),
}))

vi.mock('~i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string, params?: Record<string, string>) =>
    key === 'results.title' ? params?.title || '' : key,
}))

describe('ElectionResults', () => {
  it('defaults null choice results to zero votes', () => {
    const captured: any[] = []
    state.election = Object.assign(new PublishedElection(), {
      status: ElectionStatus.RESULTS,
      endDate: new Date('2026-01-01T00:00:00.000Z'),
      electionType: { secretUntilTheEnd: true },
      resultsType: { name: 'SINGLE_CHOICE_MULTIQUESTION', properties: { canAbstain: false } },
      meta: {},
      questions: [
        {
          title: { default: 'Q1' },
          choices: [{ title: { default: 'A' }, results: null, value: 0 }],
        },
      ],
    })

    render(
      <ComponentsProvider
        components={{
          ElectionResults: (props) => {
            captured.push(props)
            return null
          },
        }}
      >
        <ElectionResults />
      </ComponentsProvider>
    )

    expect(captured[0].questions[0].choices[0].votes).toBe('0')
  })
})
