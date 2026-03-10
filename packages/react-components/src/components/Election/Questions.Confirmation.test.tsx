import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ConfirmContext } from '~confirm/ConfirmProvider'
import { QuestionsConfirmation } from './Questions/Confirmation'

vi.mock('../../../i18n/localize', () => ({
  useReactComponentsLocalize: () => (key: string) => key === 'vote.abstain' ? 'Abstain' : key,
}))

describe('QuestionsConfirmation', () => {
  it('maps single-choice answers into answersView', () => {
    const captured: any[] = []
    const election = {
      resultsType: { name: 'SINGLE_CHOICE_MULTIQUESTION' },
      questions: [
        {
          title: { default: 'Q1' },
          choices: [
            { value: 0, title: { default: 'A' } },
            { value: 1, title: { default: 'B' } },
          ],
        },
      ],
    } as any

    render(
      <ConfirmContext.Provider
        value={{ isOpen: false, prompt: null, proceed: vi.fn(), cancel: vi.fn(), confirm: vi.fn() }}
      >
        <ComponentsProvider
          components={{
            QuestionsConfirmation: (props) => {
              captured.push(props)
              return null
            },
          }}
        >
          <QuestionsConfirmation election={election} answers={{ '0': '1' }} />
        </ComponentsProvider>
      </ConfirmContext.Provider>
    )

    expect(captured[0].answersView).toEqual([{ question: 'Q1', answers: ['B'] }])
  })

  it('maps multi-choice missing values to abstain', () => {
    const captured: any[] = []
    const election = {
      resultsType: { name: 'MULTIPLE_CHOICE' },
      questions: [
        {
          title: { default: 'Q1' },
          choices: [{ value: 0, title: { default: 'A' } }],
        },
      ],
    } as any

    render(
      <ConfirmContext.Provider
        value={{ isOpen: false, prompt: null, proceed: vi.fn(), cancel: vi.fn(), confirm: vi.fn() }}
      >
        <ComponentsProvider
          components={{
            QuestionsConfirmation: (props) => {
              captured.push(props)
              return null
            },
          }}
        >
          <QuestionsConfirmation election={election} answers={{}} />
        </ComponentsProvider>
      </ConfirmContext.Provider>
    )

    expect(captured[0].answersView).toEqual([{ question: 'Q1', answers: ['vote.abstain'] }])
  })
})
