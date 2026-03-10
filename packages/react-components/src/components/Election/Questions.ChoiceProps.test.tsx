import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '../context/ComponentsProvider'
import { ElectionQuestion } from './Questions/Fields'

const state = vi.hoisted(() => ({
  election: null as any,
  watchValue: '' as any,
}))

const { PublishedElection } = vi.hoisted(() => {
  class PublishedElection {
    id = '0xabc'
    status = 'ONGOING'
    resultsType: any
    voteType = { maxCount: 2 }
    questions: any[] = []

    constructor(resultsType: string) {
      this.resultsType = { name: resultsType, properties: { canAbstain: false } }
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
  Controller: ({ name, render }: any) =>
    render({
      field: {
        name,
        value: state.watchValue,
        onChange: vi.fn(),
      },
      fieldState: {},
    }),
}))

vi.mock('../../../i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string) => key,
}))

vi.mock('./Questions/Tip', () => ({
  QuestionTip: () => null,
}))

describe('ElectionQuestion choice slot props', () => {
  const renderAndCapture = (options: { resultsType: string; watchValue: string | string[]; question: any }) => {
    state.election = new PublishedElection(options.resultsType)
    state.watchValue = options.watchValue

    const questionProps: any[] = []
    const choiceProps: any[] = []

    render(
      <ComponentsProvider
        components={{
          ElectionQuestion: (props) => {
            questionProps.push(props)
            return (
              <div>
                <label>{props.title}</label>
                {props.fields}
                {props.tip}
              </div>
            )
          },
          QuestionChoice: (props) => {
            choiceProps.push(props)
            return <label>{props.choice.title.default}</label>
          },
          QuestionTip: () => null,
        }}
      >
        <ElectionQuestion question={options.question} index='0' />
      </ComponentsProvider>
    )

    return { questionProps, choiceProps }
  }

  it('emits extended + single selection props for single-choice metadata questions', () => {
    const question = {
      title: { default: 'Question' },
      description: { default: 'Description' },
      choices: [
        {
          value: 0,
          title: { default: 'Choice A' },
          meta: { description: 'Meta description', image: { default: 'ipfs://image' } },
        },
      ],
    } as any

    const { questionProps, choiceProps } = renderAndCapture({
      resultsType: 'SINGLE_CHOICE_MULTIQUESTION',
      watchValue: '0',
      question,
    })

    expect(questionProps[0].hasExtendedChoices).toBe(true)
    expect(questionProps[0].selectionMode).toBe('single')
    expect(questionProps[0].layout).toBe('grid')
    expect(questionProps[0].invalid).toBe(false)
    expect(choiceProps[0].controlType).toBe('radio')
    expect(choiceProps[0].presentation).toBe('extended')
    expect(choiceProps[0].selectionMode).toBe('single')
    expect(choiceProps[0].value).toBe('0')
    expect(choiceProps[0].compact).toBe(false)
    expect(choiceProps[0].hasImage).toBe(true)
    expect(choiceProps[0].canOpenImageModal).toBe(true)
    expect(choiceProps[0].dataAttrs?.['data-choice-card']).toBe('')
    expect(choiceProps[0].label).toBe('Choice A')
    expect(choiceProps[0].description).toBe('Meta description')
    expect(choiceProps[0].image?.default).toBe('https://infura-ipfs.io/ipfs/image')
  })

  it('emits basic + multiple selection props for multi-choice without metadata', () => {
    const question = {
      title: { default: 'Question' },
      choices: [
        {
          value: 0,
          title: { default: 'Choice A' },
        },
      ],
    } as any

    const { questionProps, choiceProps } = renderAndCapture({
      resultsType: 'MULTIPLE_CHOICE',
      watchValue: [],
      question,
    })

    expect(questionProps[0].hasExtendedChoices).toBe(false)
    expect(questionProps[0].selectionMode).toBe('multiple')
    expect(questionProps[0].layout).toBe('list')
    expect(questionProps[0].invalid).toBe(false)
    expect(choiceProps[0].controlType).toBe('checkbox')
    expect(choiceProps[0].presentation).toBe('basic')
    expect(choiceProps[0].selectionMode).toBe('multiple')
    expect(choiceProps[0].value).toBe('0')
    expect(choiceProps[0].compact).toBe(true)
    expect(choiceProps[0].hasImage).toBe(false)
    expect(choiceProps[0].canOpenImageModal).toBe(false)
    expect(choiceProps[0].description).toBeUndefined()
    expect(choiceProps[0].image).toBeUndefined()
  })

  it('emits basic + single selection props for single-choice without metadata', () => {
    const question = {
      title: { default: 'Question' },
      choices: [{ value: 0, title: { default: 'Choice A' } }],
    } as any

    const { questionProps, choiceProps } = renderAndCapture({
      resultsType: 'SINGLE_CHOICE_MULTIQUESTION',
      watchValue: '0',
      question,
    })

    expect(questionProps[0].hasExtendedChoices).toBe(false)
    expect(questionProps[0].selectionMode).toBe('single')
    expect(questionProps[0].layout).toBe('list')
    expect(choiceProps[0].controlType).toBe('radio')
    expect(choiceProps[0].presentation).toBe('basic')
  })

  it('emits extended + multiple selection props for multi-choice metadata questions', () => {
    const question = {
      title: { default: 'Question' },
      choices: [
        {
          value: 0,
          title: { default: 'Choice A' },
          meta: { description: 'Meta description', image: { default: 'ipfs://image' } },
        },
      ],
    } as any

    const { questionProps, choiceProps } = renderAndCapture({
      resultsType: 'MULTIPLE_CHOICE',
      watchValue: [],
      question,
    })

    expect(questionProps[0].hasExtendedChoices).toBe(true)
    expect(questionProps[0].selectionMode).toBe('multiple')
    expect(questionProps[0].layout).toBe('grid')
    expect(choiceProps[0].controlType).toBe('checkbox')
    expect(choiceProps[0].presentation).toBe('extended')
  })

  it('emits basic + multiple selection props for approval without metadata', () => {
    const question = {
      title: { default: 'Question' },
      choices: [{ value: 0, title: { default: 'Choice A' } }],
    } as any

    const { questionProps, choiceProps } = renderAndCapture({
      resultsType: 'APPROVAL',
      watchValue: [],
      question,
    })

    expect(questionProps[0].hasExtendedChoices).toBe(false)
    expect(questionProps[0].selectionMode).toBe('multiple')
    expect(questionProps[0].layout).toBe('list')
    expect(choiceProps[0].controlType).toBe('checkbox')
    expect(choiceProps[0].presentation).toBe('basic')
  })

  it('emits extended + multiple selection props for approval metadata questions', () => {
    const question = {
      title: { default: 'Question' },
      choices: [
        {
          value: 0,
          title: { default: 'Choice A' },
          meta: { description: 'Meta description', image: { default: 'ipfs://image' } },
        },
      ],
    } as any

    const { questionProps, choiceProps } = renderAndCapture({
      resultsType: 'APPROVAL',
      watchValue: [],
      question,
    })

    expect(questionProps[0].hasExtendedChoices).toBe(true)
    expect(questionProps[0].selectionMode).toBe('multiple')
    expect(questionProps[0].layout).toBe('grid')
    expect(choiceProps[0].controlType).toBe('checkbox')
    expect(choiceProps[0].presentation).toBe('extended')
  })
})
