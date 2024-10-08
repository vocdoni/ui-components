import { Wallet } from '@ethersproject/wallet'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import React, { createContext, PropsWithChildren, ReactNode, useContext, useEffect } from 'react'
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { useConfirm } from '../../layout'
import { QuestionsConfirmation } from './Confirmation'

export const DefaultElectionFormId = 'election-questions'

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

export type QuestionsFormProviderProps = {
  confirmContents?: (election: PublishedElection, answers: FieldValues) => ReactNode
}

export const QuestionsFormProvider: React.FC<PropsWithChildren<QuestionsFormProviderProps>> = ({
  confirmContents,
  children,
}) => {
  const fmethods = useForm()
  const { confirm } = useConfirm()
  const { election, client, vote: bvote } = useElection()

  const vote = async (values: Record<string, FieldValues>) => {
    if (!election || !(election instanceof PublishedElection)) {
      console.warn('vote attempt with no valid election defined')
      return false
    }

    const electionValues = values[election.id]

    if (
      client.wallet instanceof Wallet &&
      !(await confirm(
        typeof confirmContents === 'function' ? (
          confirmContents(election, electionValues)
        ) : (
          <QuestionsConfirmation election={election} answers={electionValues} />
        )
      ))
    ) {
      return false
    }

    let results: number[] = []
    switch (election.resultsType.name) {
      case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
        results = election.questions.map((q, k) => parseInt(electionValues[k.toString()], 10))
        break
      case ElectionResultsTypeNames.MULTIPLE_CHOICE:
        results = Object.values(electionValues)
          .pop()
          .map((v: string) => parseInt(v, 10))
        // map proper abstain ids
        if (election.resultsType.properties.canAbstain && results.length < election.voteType.maxCount!) {
          let abs = 0
          while (results.length < (election.voteType.maxCount || 1)) {
            results.push(parseInt(election.resultsType.properties.abstainValues[abs++], 10))
          }
        }
        break
      case ElectionResultsTypeNames.APPROVAL:
        results = election.questions[0].choices.map((c, k) => {
          if (electionValues[0].includes(k.toString())) {
            return 1
          } else {
            return 0
          }
        })
        break
      default:
        throw new Error('Unknown or invalid election type')
    }

    return bvote(results)
  }

  // reset form if account gets disconnected
  useEffect(() => {
    if (
      typeof client.wallet !== 'undefined' ||
      !election ||
      !(election instanceof PublishedElection) ||
      !election?.questions
    )
      return

    fmethods.reset({
      ...election.questions.reduce((acc, question, index) => ({ ...acc, [index]: '' }), {}),
    })
  }, [client, election, fmethods])

  return (
    <FormProvider {...fmethods}>
      <QuestionsFormContext.Provider value={{ fmethods, vote }}>{children}</QuestionsFormContext.Provider>
    </FormProvider>
  )
}
