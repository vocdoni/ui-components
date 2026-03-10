import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '../context/ComponentsProvider'
import { ElectionQuestion } from './Questions/Fields'

const state = vi.hoisted(() => ({
  election: null as any,
  controllers: [] as any[],
}))

const { PublishedElection } = vi.hoisted(() => {
  class PublishedElection {
    id = '0xabc'
    status = 'ONGOING'
    resultsType: any
    voteType = { maxCount: 2 }
    questions: any[] = []

    constructor(resultsType: string, canAbstain = false) {
      this.resultsType = { name: resultsType, properties: { canAbstain, abstainValues: ['99', '98'] } }
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

vi.mock('../../providers', () => ({
  useElection: () => ({
    election: state.election,
    isAbleToVote: true,
    loading: { voting: false },
  }),
}))

vi.mock('react-hook-form', () => ({
  useFormContext: () => ({
    control: {},
    trigger: vi.fn(),
    formState: { errors: {} },
  }),
  Controller: (props: any) => {
    state.controllers.push(props)
    return props.render({
      field: {
        name: props.name,
        value: undefined,
        onChange: vi.fn(),
      },
      fieldState: {},
    })
  },
}))

vi.mock('../../../i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string, options?: Record<string, unknown>) =>
    key === 'validation.choices_count' ? `choices_count:${String(options?.count)}` : key,
}))

vi.mock('./Questions/Tip', () => ({
  QuestionTip: () => null,
}))

describe('ElectionQuestion validations', () => {
  const question = {
    title: { default: 'Question' },
    choices: [
      { value: 0, title: { default: 'A' } },
      { value: 1, title: { default: 'B' } },
    ],
  } as any

  it('sets required validation for single choice', () => {
    state.controllers = []
    state.election = new PublishedElection('SINGLE_CHOICE_MULTIQUESTION')

    render(
      <ComponentsProvider>
        <ElectionQuestion question={question} index='0' />
      </ComponentsProvider>
    )

    const controller = state.controllers.find((entry) => entry?.name === '0')
    expect(controller).toBeDefined()
    expect(controller.rules.required).toBe('validation.required')
  })

  it('sets at-least-one validation for approval', () => {
    state.controllers = []
    state.election = new PublishedElection('APPROVAL')

    render(
      <ComponentsProvider>
        <ElectionQuestion question={question} index='0' />
      </ComponentsProvider>
    )

    const controller = state.controllers.find((entry) => entry?.name === '0')
    const validate = controller.rules.validate
    expect(validate([])).not.toBe(true)
    expect(validate(['0'])).toBe(true)
  })

  it('sets max-count validation for multi choice with abstain exception', () => {
    state.controllers = []
    state.election = new PublishedElection('MULTIPLE_CHOICE', true)

    render(
      <ComponentsProvider>
        <ElectionQuestion question={question} index='0' />
      </ComponentsProvider>
    )

    const controller = state.controllers.find((entry) => entry?.name === '0')
    const validate = controller.rules.validate
    expect(validate(['0'])).not.toBe(true)
    expect(validate(['0', '1'])).toBe(true)
    expect(validate(['-1'])).toBe(true)
  })
})
