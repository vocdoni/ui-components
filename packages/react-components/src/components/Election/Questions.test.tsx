import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '../context/ComponentsProvider'
import { ElectionQuestionsForm } from './Questions/Questions'

const { PublishedElection } = vi.hoisted(() => {
  class PublishedElection {
    id = '0xabc'
    questions = [{ title: { default: 'Question 1' }, choices: [], description: { default: 'desc' } }]
    resultsType = { name: 'SINGLE_CHOICE_MULTIQUESTION', properties: { canAbstain: false } }
    voteType = { maxCount: 1 }
    census = { weight: 1, size: 1 }
  }
  return { PublishedElection }
})

vi.mock('@vocdoni/sdk', () => {
  return {
    PublishedElection,
    ElectionResultsTypeNames: {
      SINGLE_CHOICE_MULTIQUESTION: 'SINGLE_CHOICE_MULTIQUESTION',
      MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
      APPROVAL: 'APPROVAL',
    },
  }
})

vi.mock('../../providers', () => ({
  useClient: vi.fn(() => ({ env: 'prod' })),
  useElection: vi.fn(() => ({
    election: new PublishedElection(),
    voted: null,
    isAbleToVote: true,
    loading: { voting: false },
    errors: { voting: null },
  })),
}))

vi.mock('./Questions/Form', () => ({
  useQuestionsForm: () => ({
    fmethods: { handleSubmit: (fn: any) => (e: any) => fn(e) },
    vote: vi.fn(),
  }),
}))

vi.mock('./Questions/Fields', () => ({
  ElectionQuestion: ({ index }: { index: string }) => <div data-testid={`question-${index}`}>Question</div>,
}))

describe('ElectionQuestions', () => {
  it('renders form with deterministic id', () => {
    const { container } = render(
      <ComponentsProvider>
        <ElectionQuestionsForm />
      </ComponentsProvider>
    )

    expect(container.querySelector('form')).toBeInTheDocument()
  })
})
