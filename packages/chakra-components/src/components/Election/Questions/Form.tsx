import { Wallet } from '@ethersproject/wallet'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { useConfirm } from '../../layout'
import { QuestionsConfirmation } from './Confirmation'
import { ElectionStateStorage, RenderWith, SubElectionState, SubmitFormValidation } from './Questions'

export type FormFieldValues = Record<string, FieldValues>

export type QuestionsFormContextState = {
  fmethods: UseFormReturn<FormFieldValues>
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
  confirmContents?: (elections: ElectionStateStorage, answers: FormFieldValues) => ReactNode
}

// Props that must not be shared with ElectionQuestionsProps
export type SpecificFormProviderProps = {
  renderWith?: RenderWith[]
  validate?: SubmitFormValidation
}

export const QuestionsFormProvider: React.FC<
  PropsWithChildren<QuestionsFormProviderProps & SpecificFormProviderProps>
> = ({ children, ...props }) => {
  const fmethods = useForm<FormFieldValues>()
  const multiElections = useMultiElectionsProvider({ fmethods, ...props })
  const value = { fmethods, renderWith: props.renderWith, validate: props.validate, ...multiElections }

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
  ...rest
}: { fmethods: UseFormReturn<FormFieldValues> } & QuestionsFormProviderProps & SpecificFormProviderProps) => {
  const { confirm } = useConfirm()
  // State to manually disable the form
  const [isDisabled, setIsDisabled] = useState(false)
  const { client, isAbleToVote: rootIsAbleToVote, voted: rootVoted, election, loaded: rootLoaded, vote } = useElection() // Root Election
  // State to store on memory the loaded elections to pass it into confirm modal to show the info
  const [electionsStates, setElectionsStates] = useState<ElectionStateStorage>({})
  const [voting, setVoting] = useState<boolean>(false)

  // Util to check if the electionsStates object contains elections and is not empty
  const _electionsCount = Object.values(electionsStates).length
  const voted = useMemo(
    () =>
      electionsStates && _electionsCount > 0 && Object.values(electionsStates).every(({ voted }) => voted)
        ? 'true'
        : null,
    [electionsStates, _electionsCount]
  )

  const isAbleToVote = useMemo(
    () =>
      electionsStates && _electionsCount > 0 && Object.values(electionsStates).some(({ isAbleToVote }) => isAbleToVote),
    [electionsStates, _electionsCount]
  )

  const loaded = useMemo(
    () =>
      electionsStates &&
      _electionsCount > 0 &&
      _electionsCount === rest.renderWith?.length + 1 && // If the amount of elections is the same as the amount of subelections + root election
      Object.values(electionsStates).every(({ loaded }) => loaded.election),
    [electionsStates, _electionsCount]
  )

  // Add an election to the storage
  const addElection = useCallback(
    (electionState: SubElectionState) => {
      setElectionsStates((prev) => ({
        ...prev,
        [(electionState.election as PublishedElection).id]: electionState,
      }))
    },
    [setElectionsStates]
  )

  // Root election state to be added to the state storage
  const rootElectionState: SubElectionState | null = useMemo(() => {
    if (!election || !(election instanceof PublishedElection)) return null
    return {
      vote,
      election,
      isAbleToVote: rootIsAbleToVote,
      voted: rootVoted,
      loaded: rootLoaded,
    }
  }, [vote, election, rootIsAbleToVote, rootVoted, rootLoaded])

  // reset form if account gets disconnected
  useEffect(() => {
    if (
      (typeof client.wallet === 'undefined' || Object.values(client.wallet).length === 0) &&
      Object.keys(electionsStates).length > 0
    ) {
      fmethods.reset({
        ...Object.values(electionsStates).reduce((acc, { election }) => ({ ...acc, [election.id]: '' }), {}),
      })
    }
  }, [client, electionsStates, fmethods])

  // Add the root election to the state to elections cache
  useEffect(() => {
    if (!rootElectionState || !rootElectionState.election) return
    const actualState = electionsStates[rootElectionState.election.id]
    if (
      (!actualState && rootElectionState.loaded.election) ||
      (actualState && rootElectionState.isAbleToVote !== actualState?.isAbleToVote)
    ) {
      addElection(rootElectionState)
    }
  }, [rootElectionState, electionsStates])

  const voteAll = async (values: FormFieldValues) => {
    if (!electionsStates || Object.keys(electionsStates).length === 0) {
      console.warn('vote attempt with no valid elections defined')
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

    const votingList = Object.entries(electionsStates).map(([key, { election, vote, isAbleToVote }]) => {
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
    isDisabled,
    setIsDisabled,
    loaded,
  }
}
