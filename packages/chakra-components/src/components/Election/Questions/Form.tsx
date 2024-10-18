import { Wallet } from '@ethersproject/wallet'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import React, { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { useConfirm } from '../../layout'
import { QuestionsConfirmation } from './Confirmation'
import { ElectionStateStorage, RenderWith, SubElectionState, SubmitFormValidation } from './Questions'

export type QuestionsFormContextState = {
  fmethods: UseFormReturn<any>
} & SpecificFormProviderProps &
  ReturnType<typeof useMultiElectionsProvider>

const QuestionsFormContext = createContext<QuestionsFormContextState | undefined>(undefined)

export const useQuestionsForm = () => {
  const context = useContext(QuestionsFormContext)
  if (!context) {
    throw new Error('useQuestionsForm must be used within a QuestionsFormProvider')
  }
  return context
}

export type QuestionsFormProviderProps = {
  confirmContents?: (elections: ElectionStateStorage, answers: Record<string, FieldValues>) => ReactNode
}

// Props that must not be shared with ElectionQuestionsProps
export type SpecificFormProviderProps = {
  renderWith?: RenderWith[]
  validate?: SubmitFormValidation
}

export const QuestionsFormProvider: React.FC<
  PropsWithChildren<QuestionsFormProviderProps & SpecificFormProviderProps>
> = ({ children, ...props }) => {
  const fmethods = useForm()
  const multiElections = useMultiElectionsProvider({ fmethods, ...props })

  return (
    <FormProvider {...fmethods}>
      <QuestionsFormContext.Provider
        value={{ fmethods, renderWith: props.renderWith, validate: props.validate, ...multiElections }}
      >
        {children}
      </QuestionsFormContext.Provider>
    </FormProvider>
  )
}

export const constructVoteBallot = (election: PublishedElection, choices: FieldValues) => {
  let results: number[] = []
  switch (election.resultsType.name) {
    case ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION:
      results = election.questions.map((q, k) => parseInt(choices[k.toString()], 10))
      break
    case ElectionResultsTypeNames.MULTIPLE_CHOICE:
      results = Object.values(choices)
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
        if (choices[0].includes(k.toString())) {
          return 1
        } else {
          return 0
        }
      })
      break
    default:
      throw new Error('Unknown or invalid election type')
  }
  return results
}

const useMultiElectionsProvider = ({
  fmethods,
  confirmContents,
}: { fmethods: UseFormReturn } & QuestionsFormProviderProps) => {
  const { confirm } = useConfirm()
  const { client, isAbleToVote: rootIsAbleToVote, voted: rootVoted, election, vote } = useElection() // Root Election
  // State to store on memory the loaded elections to pass it into confirm modal to show the info
  const [electionsStates, setElectionsStates] = useState<ElectionStateStorage>({})
  const [voting, setVoting] = useState<boolean>(false)

  const voted = useMemo(
    () => (electionsStates && Object.values(electionsStates).every(({ voted }) => voted) ? 'true' : null),
    [electionsStates]
  )

  const isAbleToVote = useMemo(
    () => electionsStates && Object.values(electionsStates).some(({ isAbleToVote }) => isAbleToVote),
    [electionsStates]
  )

  // Add an election to the storage
  const addElection = (electionState: SubElectionState) => {
    setElectionsStates((prev) => ({
      ...prev,
      [(electionState.election as PublishedElection).id]: electionState,
    }))
  }

  // Root election state to be added to the state storage
  const rootElectionState: SubElectionState | null = useMemo(() => {
    if (!election || !(election instanceof PublishedElection)) return null
    return {
      vote,
      election,
      isAbleToVote: rootIsAbleToVote,
      voted: rootVoted,
    }
  }, [vote, election, rootIsAbleToVote, rootVoted])

  // reset form if account gets disconnected
  useEffect(() => {
    if (typeof client.wallet !== 'undefined') return

    setElectionsStates({})
    fmethods.reset({
      ...Object.values(electionsStates).reduce((acc, { election }) => ({ ...acc, [election.id]: '' }), {}),
    })
  }, [client, electionsStates, fmethods])

  // Add the root election to the state to elections cache
  useEffect(() => {
    if (!rootElectionState || !rootElectionState.election) return
    const actualState = electionsStates[rootElectionState.election.id]
    if (rootElectionState.vote === actualState?.vote || rootElectionState.isAbleToVote === actualState?.isAbleToVote) {
      return
    }
    addElection(rootElectionState)
  }, [rootElectionState, electionsStates, election])

  const voteAll = async (values: Record<string, FieldValues>) => {
    if (!electionsStates || Object.keys(electionsStates).length === 0) {
      console.warn('vote attempt with no valid elections not defined')
      return false
    }

    if (
      client.wallet instanceof Wallet &&
      !(await confirm(
        typeof confirmContents === 'function' ? (
          confirmContents(electionsStates, values)
        ) : (
          <QuestionsConfirmation elections={electionsStates} answers={values} />
        )
      ))
    ) {
      return false
    }

    setVoting(true)

    const votingList = Object.entries(electionsStates).map(([key, { election, vote, voted, isAbleToVote }]) => {
      if (!(election instanceof PublishedElection) || !values[election.id] || !isAbleToVote) {
        return Promise.resolve()
      }
      const votePackage = constructVoteBallot(election, values[election.id])
      return vote(votePackage)
    })
    return Promise.all(votingList).finally(() => setVoting(false))
  }

  return {
    voting,
    voteAll,
    rootClient: client,
    elections: electionsStates,
    addElection,
    isAbleToVote,
    voted,
  }
}
