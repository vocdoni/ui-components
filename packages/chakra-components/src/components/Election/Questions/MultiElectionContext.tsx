import React, { createContext, FC, PropsWithChildren, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { PublishedElection, VocdoniSDKClient } from '@vocdoni/sdk'
import { Wallet } from '@ethersproject/wallet'
import { useElection, ElectionState } from '@vocdoni/react-providers'
import { MultiElectionConfirmation } from './MultiElectionConfirmation'
import { useConfirm, getVoteBallot } from '@vocdoni/chakra-components'

export type MultiElectionFormContextState = {
  fmethods: UseFormReturn<any>
} & ReturnType<typeof useMultiElectionsProvider>

export const MultiElectionsContext = createContext<MultiElectionFormContextState | undefined>(undefined)

export type MultiElectionsProviderProps = {
  renderWith: RenderWith[]
  rootClient: VocdoniSDKClient
  confirmContents?: (elections: ElectionStateStorage, answers: Record<string, FieldValues>) => ReactNode
}

export type RenderWith = {
  id: string
}

export const MultiElectionsProvider: FC<PropsWithChildren<MultiElectionsProviderProps>> = ({ children, ...props }) => {
  const fmethods = useForm()

  const multiElections = useMultiElectionsProvider({ fmethods, ...props })
  return (
    <FormProvider {...fmethods}>
      <MultiElectionsContext.Provider value={{ fmethods, ...multiElections }}>
        {children}
      </MultiElectionsContext.Provider>
    </FormProvider>
  )
}

export type SubElectionState = { election: PublishedElection } & Pick<ElectionState, 'vote' | 'isAbleToVote' | 'voted'>
export type ElectionStateStorage = Record<string, SubElectionState>

const useMultiElectionsProvider = ({
  fmethods,
  renderWith,
  rootClient,
  confirmContents,
}: { fmethods: UseFormReturn } & MultiElectionsProviderProps) => {
  const { confirm } = useConfirm()
  const { client } = useElection()
  // State to store on memory the loaded elections to pass it into confirm modal to show the info
  const [electionsStates, setElectionsStates] = useState<ElectionStateStorage>({})
  const [voting, setVoting] = useState<boolean>(false)

  const addElection = (electionState: SubElectionState) => {
    setElectionsStates((prev) => ({
      ...prev,
      [(electionState.election as PublishedElection).id]: electionState,
    }))
  }

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
          <MultiElectionConfirmation elections={electionsStates} answers={values} />
        )
      ))
    ) {
      return false
    }

    setVoting(true)

    const votingList = Object.entries(electionsStates).map(([key, { election, vote }]) => {
      if (!(election instanceof PublishedElection) || !values[election.id]) return Promise.resolve()
      const votePackage = getVoteBallot(election, values[election.id])
      return vote(votePackage)
    })
    return Promise.all(votingList).finally(() => setVoting(false))
  }

  // reset form if account gets disconnected
  useEffect(() => {
    if (typeof client.wallet !== 'undefined') return

    setElectionsStates({})
    fmethods.reset({
      ...Object.values(electionsStates).reduce((acc, { election }) => ({ ...acc, [election.id]: '' }), {}),
    })
  }, [client, electionsStates, fmethods])

  const voted = useMemo(
    () => (electionsStates && Object.values(electionsStates).every(({ voted }) => voted) ? 'true' : null),
    [electionsStates]
  )
  const isAbleToVote = useMemo(
    () => electionsStates && Object.values(electionsStates).some(({ isAbleToVote }) => isAbleToVote),
    [electionsStates]
  )

  return {
    voting,
    voteAll,
    renderWith,
    rootClient,
    elections: electionsStates,
    addElection,
    isAbleToVote,
    voted,
  }
}

export const useMultiElections = () => {
  const context = useContext(MultiElectionsContext)
  if (!context) {
    throw new Error('useMultiElections must be used within an MultiElectionsProvider')
  }
  return context
}
