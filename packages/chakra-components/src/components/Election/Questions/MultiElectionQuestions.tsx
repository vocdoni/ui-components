import { SubElectionState, useMultiElections } from './MultiElectionContext'
import { ElectionProvider, useElection } from '@vocdoni/react-providers'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import { PublishedElection } from '@vocdoni/sdk'
import { ButtonProps } from '@chakra-ui/button'
import { useMultiStyleConfig } from '@chakra-ui/system'
import { Flex } from '@chakra-ui/layout'
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control'
import { FieldValues, ValidateResult } from 'react-hook-form'
import { ElectionQuestion, ElectionQuestionsFormProps } from './Questions'
import { VoteButtonLogic } from '../VoteButton'
import { DefaultElectionFormId } from './Form'

export type SubmitFormValidation = (values: Record<string, FieldValues>) => ValidateResult | Promise<ValidateResult>

export type MultiElectionQuestionsFormProps = {
  ConnectButton?: ComponentType
  validate?: SubmitFormValidation
} & ElectionQuestionsFormProps

export const MultiElectionVoteButton = (props: ButtonProps) => {
  const { isAbleToVote, voting, voted } = useMultiElections()
  const election = useElection() // use Root election information

  return (
    <VoteButtonLogic
      electionState={{ ...election, voted, loading: { ...election.loading, voting }, isAbleToVote }}
      {...props}
    />
  )
}

export const MultiElectionQuestionsForm = ({
  formId,
  onInvalid,
  ConnectButton,
  validate,
  ...props
}: MultiElectionQuestionsFormProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const { voteAll, fmethods, renderWith } = useMultiElections()
  const [globalError, setGlobalError] = useState('')

  const { handleSubmit, watch } = fmethods
  const formData = watch()

  const onSubmit = (values: Record<string, FieldValues>) => {
    if (validate) {
      const error = validate(formData)
      if (typeof error === 'string' || (typeof error === 'boolean' && !error)) {
        setGlobalError(error.toString())
        return
      }
      setGlobalError('')
    }
    voteAll(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} id={formId ?? DefaultElectionFormId}>
      {renderWith.length > 0 && (
        <Flex direction={'column'} gap={10}>
          {renderWith.map(({ id }) => (
            <ElectionProvider key={id} ConnectButton={ConnectButton} id={id} fetchCensus>
              <SubElectionQuestions {...props} />
            </ElectionProvider>
          ))}
        </Flex>
      )}
      <FormControl isInvalid={!!globalError}>
        <FormErrorMessage sx={styles.error}>{globalError}</FormErrorMessage>
      </FormControl>
    </form>
  )
}

const SubElectionQuestions = (props: Omit<MultiElectionQuestionsFormProps, 'ConnectButton'>) => {
  const { rootClient, addElection, elections } = useMultiElections()
  const { election, setClient, vote, connected, clearClient, isAbleToVote, voted } = useElection()

  const subElectionState: SubElectionState | null = useMemo(() => {
    if (!election || !(election instanceof PublishedElection)) return null
    return {
      vote,
      election,
      isAbleToVote,
      voted,
    }
  }, [vote, election, isAbleToVote, voted])

  // clear session of local context when login out
  useEffect(() => {
    if (connected) return
    clearClient()
  }, [connected])

  // ensure the client is set to the root one
  useEffect(() => {
    setClient(rootClient)
  }, [rootClient, election])

  // Update election state cache
  useEffect(() => {
    if (!subElectionState || !subElectionState.election) return
    const actualState = elections[subElectionState.election.id]
    if (subElectionState.vote === actualState?.vote || subElectionState.isAbleToVote === actualState?.isAbleToVote) {
      return
    }
    addElection(subElectionState)
  }, [subElectionState, elections, election])

  return <ElectionQuestion {...props} />
}
