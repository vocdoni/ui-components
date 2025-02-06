import { Wallet } from '@ethersproject/wallet'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import React, { createContext, PropsWithChildren, ReactNode, useContext, useEffect } from 'react'
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { useConfirm } from '../../layout'
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

  const vote = async (values: FieldValues) => {
    if (!election || !(election instanceof PublishedElection)) {
      console.warn('vote attempt with no valid election defined')
      return false
    }

    if (
      client.wallet instanceof Wallet &&
      !(await confirm(
        typeof confirmContents === 'function' ? (
          confirmContents(election, values)
        ) : (
          <QuestionsConfirmation election={election} answers={values} />
        )
      ))
    ) {
      return false
    }

    let results: number[] = []
    switch (election.resultsType.name) {
      case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
        results = election.questions.map((q, k) => parseInt(values[k.toString()], 10))
        break
      case ElectionResultsTypeNames.MULTIPLE_CHOICE:
        results = Object.values(values)
          .pop()
          .map((v: string) => parseInt(v, 10))
        // map proper abstain ids
        if (results.includes(-1)) {
          results.splice(results.indexOf(-1), 1)
          let abs = 0
          while (results.length < (election.voteType.maxCount || 1)) {
            results.push(parseInt(election.resultsType.properties.abstainValues[abs++], 10))
          }
        }
        break
      case ElectionResultsTypeNames.APPROVAL:
        results = election.questions[0].choices.map((c, k) => {
          if (values[0].includes(k.toString())) {
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
