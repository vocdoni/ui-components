import { fireEvent, render, waitFor } from '@testing-library/react'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ConfirmContext } from '~confirm/ConfirmProvider'
import { QuestionsConfirmation } from './Questions/Confirmation'
import { ElectionQuestions } from './Questions/Questions'

const state = vi.hoisted(() => ({
  election: null as any,
  vote: vi.fn(async () => undefined),
  wallet: {} as any,
  confirm: vi.fn(async (_prompt: any) => true) as any,
  capturedPrompt: null as any,
}))

const { PublishedElection } = vi.hoisted(() => {
  class PublishedElection {
    id = '0xabc'
    status = 'ONGOING'
    resultsType: any
    voteType: any
    questions: any[]
    census = { weight: 1, size: 1 }

    constructor(resultsType: string, questions: any[], canAbstain = false, maxCount = 1) {
      this.resultsType = {
        name: resultsType,
        properties: {
          canAbstain,
          abstainValues: ['99', '98', '97'],
        },
      }
      this.voteType = { maxCount }
      this.questions = questions
    }

    get() {
      return false
    }
  }

  return { PublishedElection }
})

vi.mock('@vocdoni/sdk', () => ({
  PublishedElection,
  ElectionStatus: {
    ONGOING: 'ONGOING',
  },
  ElectionResultsTypeNames: {
    SINGLE_CHOICE_MULTIQUESTION: 'SINGLE_CHOICE_MULTIQUESTION',
    MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
    APPROVAL: 'APPROVAL',
  },
}))

const { Wallet } = vi.hoisted(() => ({ Wallet: class Wallet {} }))

vi.mock('@ethersproject/wallet', () => ({
  Wallet,
}))

vi.mock('~providers', () => ({
  useElection: () => ({
    election: state.election,
    vote: state.vote,
    connected: true,
    client: { wallet: state.wallet },
    voted: null,
    isAbleToVote: true,
    loading: { voting: false },
    errors: { voting: null },
  }),
  useClient: () => ({
    env: 'prod',
  }),
}))

vi.mock('~i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string, options?: Record<string, unknown>) =>
    key === 'validation.choices_count' ? `choices_count:${String(options?.count)}` : key,
}))

const clickByValue = (container: HTMLElement, type: 'radio' | 'checkbox', value: string) => {
  const input = container.querySelector(`input[type="${type}"][value="${value}"]`) as HTMLInputElement | null
  expect(input).toBeInTheDocument()
  fireEvent.click(input!)
}

const renderElectionQuestions = () =>
  render(
    <ConfirmContext.Provider
      value={{
        isOpen: false,
        prompt: null,
        proceed: vi.fn(),
        cancel: vi.fn(),
        confirm: state.confirm,
      }}
    >
      <ComponentsProvider>
        <ElectionQuestions />
      </ComponentsProvider>
    </ConfirmContext.Provider>
  )

describe('ElectionQuestions form integration', () => {
  beforeEach(() => {
    state.wallet = {}
    state.confirm = vi.fn(async (prompt) => {
      state.capturedPrompt = prompt
      return true
    })
    state.capturedPrompt = null
  })

  it('submits single-choice selection as numeric payload', async () => {
    state.vote = vi.fn(async () => undefined)
    state.election = new PublishedElection('SINGLE_CHOICE_MULTIQUESTION', [
      {
        title: { default: 'Single question' },
        choices: [
          { value: 0, title: { default: 'A' } },
          { value: 1, title: { default: 'B' } },
        ],
      },
    ])

    const { container } = renderElectionQuestions()

    clickByValue(container, 'radio', '1')
    fireEvent.submit(container.querySelector('form')!)

    await waitFor(() => {
      expect(state.vote).toHaveBeenCalledWith([1])
    })
  })

  it('submits approval answers as 0/1 vector', async () => {
    state.vote = vi.fn(async () => undefined)
    state.election = new PublishedElection('APPROVAL', [
      {
        title: { default: 'Approval question' },
        choices: [
          { value: 0, title: { default: 'A' } },
          { value: 1, title: { default: 'B' } },
          { value: 2, title: { default: 'C' } },
        ],
      },
    ])

    const { container } = renderElectionQuestions()

    clickByValue(container, 'checkbox', '1')
    fireEvent.submit(container.querySelector('form')!)

    await waitFor(() => {
      expect(state.vote).toHaveBeenCalledWith([0, 1, 0])
    })
  })

  it('submits multi-choice with abstain conversion payload', async () => {
    state.vote = vi.fn(async () => undefined)
    state.election = new PublishedElection(
      'MULTIPLE_CHOICE',
      [
        {
          title: { default: 'Multi question' },
          choices: [
            { value: 0, title: { default: 'A' } },
            { value: 1, title: { default: 'B' } },
          ],
        },
      ],
      true,
      2
    )

    const { container } = renderElectionQuestions()

    clickByValue(container, 'checkbox', '0')
    clickByValue(container, 'checkbox', '-1')
    fireEvent.submit(container.querySelector('form')!)

    await waitFor(() => {
      expect(state.vote).toHaveBeenCalledWith([0, 99])
    })
  })

  it('uses slot-based QuestionsConfirmation prompt when confirmation is required', async () => {
    state.vote = vi.fn(async () => undefined)
    state.wallet = new Wallet()
    state.election = new PublishedElection('SINGLE_CHOICE_MULTIQUESTION', [
      {
        title: { default: 'Single question' },
        choices: [
          { value: 0, title: { default: 'A' } },
          { value: 1, title: { default: 'B' } },
        ],
      },
    ])

    const { container } = renderElectionQuestions()

    clickByValue(container, 'radio', '1')
    fireEvent.submit(container.querySelector('form')!)

    await waitFor(() => {
      expect(state.confirm).toHaveBeenCalledTimes(1)
      expect(state.capturedPrompt?.type).toBe(QuestionsConfirmation)
    })
  })
})
