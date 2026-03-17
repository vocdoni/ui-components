import { composeComponents, defineComponent } from './helpers'

describe('composeComponents', () => {
  it('merges partial objects with rightmost precedence', () => {
    const first = { ElectionTitle: () => null, VoteButton: () => null }
    const second = { VoteButton: () => null }
    const composed = composeComponents(first, second)

    expect(Object.keys(composed)).toContain('ElectionTitle')
    expect(composed.VoteButton).toBe(second.VoteButton)
  })

  it('ignores undefined partials', () => {
    const composed = composeComponents(undefined, { ElectionTitle: () => null }, undefined)
    expect(Object.keys(composed)).toEqual(['ElectionTitle'])
  })

  it('defineComponent returns runtime identity', () => {
    const component = () => null
    const wrapped = defineComponent<'HR', { className?: string }>(component)
    expect(wrapped).toBe(component)
  })
})
