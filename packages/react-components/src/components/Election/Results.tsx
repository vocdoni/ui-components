import {
  dotobject,
  ElectionResultsTypeNames,
  ElectionStatus,
  formatUnits,
  IChoice,
  IQuestion,
  PublishedElection,
} from '@vocdoni/sdk'
import { format } from 'date-fns'
import { ComponentPropsWithoutRef } from 'react'
import { useComponents } from '~components/context/useComponents'
import { linkifyIpfs } from '~components/shared/ipfs'
import { useReactComponentsLocalize } from '~i18n/localize'
import { useElection } from '~providers'

const percent = (result: number, total: number) => ((Number(result) / total) * 100 || 0).toFixed(1) + '%'
export const results = (result: number, decimals?: number) =>
  decimals ? parseInt(formatUnits(BigInt(result), decimals), 10) : result

export type ElectionResultsProps = ComponentPropsWithoutRef<'div'> & {
  forceRender?: boolean
  extended?: boolean
}

const electionChoices = (election: PublishedElection, q: IQuestion, abstainLabel: string) => {
  const nchoices = [...q.choices]

  if (
    election.resultsType.name === ElectionResultsTypeNames.MULTIPLE_CHOICE &&
    election.resultsType.properties.canAbstain
  ) {
    const abstain: IChoice = {
      title: { default: abstainLabel },
      results: q.numAbstains as string,
      value: -1,
    }
    nchoices.push(abstain)
  }

  return nchoices
}

export const ElectionResults = ({ extended = false, forceRender, ...rest }: ElectionResultsProps) => {
  const { election } = useElection()
  const localize = useReactComponentsLocalize()
  const { ElectionResults: Slot } = useComponents()

  if (!election || !(election instanceof PublishedElection) || election.status === ElectionStatus.CANCELED) return null

  if (election.electionType.secretUntilTheEnd && election.status !== ElectionStatus.RESULTS && !forceRender) {
    return (
      <Slot
        {...rest}
        secretText={localize('results.secret_until_the_end', {
          endDate: format(election.endDate, localize('results.date_format')),
        })}
      />
    )
  }

  const decimals = (election.meta as any)?.token?.decimals || 0
  const totalsAbstain = election.questions.map((q) => ('numAbstains' in q ? Number(q.numAbstains) : 0))

  const totals = election.questions
    .map((el, idx) => el.choices.reduce((acc, curr) => acc + Number(curr.results), totalsAbstain[idx]))
    .map((votes: number) => results(votes, decimals))

  const questions = election.questions.map((question, idx) => {
    const choices = electionChoices(election, question, localize('vote.abstain'))
    return {
      title: localize('results.title', { title: question.title.default }),
      choices: choices.map((choice: any) => {
        const meta = choice.meta ?? {}
        const description = dotobject(meta, 'description') as string | undefined
        const image = dotobject(meta, 'image.default') as string | undefined
        const votes = results(choice.results, decimals)
        return {
          title: choice.title.default,
          votes: String(votes),
          percent: percent(votes, totals[idx]),
          description: extended ? description : undefined,
          image: extended ? linkifyIpfs(image) : undefined,
        }
      }),
    }
  })

  return <Slot {...rest} questions={questions} />
}
