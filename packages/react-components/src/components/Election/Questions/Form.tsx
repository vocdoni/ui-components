import { Wallet } from '@ethersproject/wallet'
import { useElection } from '../../../providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { useConfirm } from '../../../confirm/useConfirm'
import { QuestionsConfirmation } from './Confirmation'

export type QuestionsFormContextState = {
  fmethods: UseFormReturn<any>
  vote: (values: FieldValues) => Promise<false | void>
}

const QuestionsFormContext = createContext<QuestionsFormContextState | undefined>(undefined)

export const useQuestionsForm = () => {
  const context = useContext(QuestionsFormContext)
  if (!context) {
    throw new Error('useQuestionsForm must be used within a QuestionsFormProvider')
  }
  return context
}

export type QuestionsFormProviderProps = {}

export const QuestionsFormProvider = ({ children }: PropsWithChildren<QuestionsFormProviderProps>) => {
  const fmethods = useForm()
  const { confirm } = useConfirm()
  const { election, client, vote: baseVote, connected } = useElection()

  const vote = async (values: FieldValues) => {
    if (!election || !(election instanceof PublishedElection)) {
      console.warn('vote attempt with no valid election defined')
      return false
    }

    if (
      client.wallet instanceof Wallet &&
      !(await confirm(<QuestionsConfirmation election={election} answers={values} />))
    ) {
      return false
    }

    let results: number[] = []
    switch (election.resultsType.name) {
      case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
        results = election.questions.map((_question, index) => parseInt(values[index.toString()], 10))
        break
      case ElectionResultsTypeNames.MULTIPLE_CHOICE:
        results = ((Object.values(values).pop() || []) as string[]).map((value: string) => parseInt(value, 10))
        if (
          results.includes(-1) ||
          (election.resultsType.properties.canAbstain && (!values || results.length < election.voteType.maxCount!))
        ) {
          if (results.includes(-1)) {
            results.splice(results.indexOf(-1), 1)
          }
          let abstainIndex = 0
          while (results.length < (election.voteType.maxCount || 1)) {
            results.push(parseInt(election.resultsType.properties.abstainValues[abstainIndex++], 10))
          }
        }
        break
      case ElectionResultsTypeNames.APPROVAL:
        results = election.questions[0].choices.map((_choice, index) => (values[0].includes(index.toString()) ? 1 : 0))
        break
      default:
        throw new Error('Unknown or invalid election type')
    }

    return baseVote(results)
  }

  useEffect(() => {
    if (connected || !election || !(election instanceof PublishedElection) || !election.questions) return

    fmethods.reset({
      ...election.questions.reduce((acc, _question, index) => ({ ...acc, [index]: '' }), {}),
    })
  }, [election, fmethods, connected])

  return (
    <FormProvider {...fmethods}>
      <QuestionsFormContext.Provider value={{ fmethods, vote }}>{children}</QuestionsFormContext.Provider>
    </FormProvider>
  )
}
