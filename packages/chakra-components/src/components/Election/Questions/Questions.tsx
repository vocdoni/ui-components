import { Alert, AlertIcon } from '@chakra-ui/alert'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { ElectionProvider, ElectionState, useElection } from '@vocdoni/react-providers'
import { IQuestion, PublishedElection } from '@vocdoni/sdk'
import { FieldValues, SubmitErrorHandler, SubmitHandler } from 'react-hook-form'
import { QuestionField, QuestionProps } from './Fields'
import { FormFieldValues, QuestionsFormProvider, QuestionsFormProviderProps, useQuestionsForm } from './Form'
import { QuestionsTypeBadge } from './TypeBadge'
import { MultiElectionVoted, Voted } from './Voted'
import React, { useEffect, useMemo } from 'react'

export type RenderWith = {
  id: string
}

export type ExtendedSubmitHandler<TFieldValues extends FieldValues> = (
  onSubmit: SubmitHandler<TFieldValues>,
  ...args: [...Parameters<SubmitHandler<TFieldValues>>]
) => ReturnType<SubmitHandler<TFieldValues>>

export type ElectionQuestionsFormProps = ChakraProps & {
  onInvalid?: SubmitErrorHandler<FieldValues>
  onSubmit?: ExtendedSubmitHandler<FormFieldValues>
  formId?: string
}

export type ElectionQuestionsProps = ElectionQuestionsFormProps & QuestionsFormProviderProps

export const ElectionQuestions = ({ confirmContents, ...props }: ElectionQuestionsProps) => {
  return (
    <QuestionsFormProvider {...{ confirmContents }}>
      <ElectionQuestionsForm {...props} />
    </QuestionsFormProvider>
  )
}

export const ElectionQuestionsForm = ({ formId, onSubmit, onInvalid, ...rest }: ElectionQuestionsFormProps) => {
  const styles = useMultiStyleConfig('ElectionQuestions')
  const { loaded, fmethods, voteAll, renderWith, isDisabled } = useQuestionsForm()
  const { ConnectButton, election } = useElection() // use Root election information

  const { handleSubmit } = fmethods

  if (!(election instanceof PublishedElection)) return null

  return (
    <chakra.form
      onSubmit={handleSubmit((...params) => {
        if (onSubmit) {
          return onSubmit(voteAll, ...params)
        }
        return voteAll(params[0])
      }, onInvalid)}
      id={formId ?? `election-questions-${election.id}`}
      __css={styles.form}
    >
      <MultiElectionVoted />
      <chakra.div __css={styles.elections}>
        {loaded && <ElectionQuestion isDisabled={isDisabled} {...rest} />}
        {renderWith?.length > 0 &&
          renderWith.map(({ id }) => (
            <ElectionProvider key={id} ConnectButton={ConnectButton} id={id} fetchCensus>
              <SubElectionQuestions {...rest} />
            </ElectionProvider>
          ))}
      </chakra.div>
    </chakra.form>
  )
}

export const ElectionQuestion = ({ isDisabled, ...props }: Pick<QuestionProps, 'isDisabled'> & ChakraProps) => {
  const {
    election,
    voted,
    errors: { voting: error },
    localize,
    isAbleToVote,
  } = useElection()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const questions: IQuestion[] | undefined = (election as PublishedElection)?.questions

  if (!(election instanceof PublishedElection)) return null

  if (voted && !isAbleToVote) {
    return null
  }

  if (!questions || (questions && !questions?.length)) {
    return (
      <Alert variant='subtle' status='warning' sx={styles.alert}>
        <AlertIcon />
        {localize('empty')}
      </Alert>
    )
  }

  return (
    <chakra.div __css={styles.wrapper} {...props}>
      <Voted />
      <chakra.div __css={styles.typeBadgeWrapper}>
        <QuestionsTypeBadge />
      </chakra.div>
      {questions.map((question, qk) => (
        <QuestionField key={qk} index={`${election.id}.${qk.toString()}`} question={question} isDisabled={isDisabled} />
      ))}
      {error && (
        <Alert status='error' variant='solid' mb={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </chakra.div>
  )
}

export type SubElectionState = { election: PublishedElection } & Pick<
  ElectionState,
  'vote' | 'isAbleToVote' | 'voted' | 'loaded'
>
export type ElectionStateStorage = Record<string, SubElectionState>

export const SubElectionQuestions = (props: ChakraProps) => {
  const { rootClient, addElection, elections, isDisabled, loaded: renderWithLoaded } = useQuestionsForm()
  const { election, setClient, vote, clearClient, isAbleToVote, voted, loaded } = useElection()

  const subElectionState: SubElectionState | null = useMemo(() => {
    if (!election || !(election instanceof PublishedElection)) return null
    return {
      vote,
      election,
      isAbleToVote,
      voted,
      loaded,
    }
  }, [vote, election, isAbleToVote, voted, loaded])

  // clear session of local context when login out
  useEffect(() => {
    if (rootClient.wallet === undefined || Object.keys(rootClient.wallet).length === 0) {
      clearClient()
    }
  }, [rootClient])

  // ensure the client is set to the root one
  useEffect(() => {
    setClient(rootClient)
  }, [rootClient])

  // Add the sub election to the state cache
  useEffect(() => {
    if (!subElectionState || !subElectionState.election) return
    const actualState = elections[subElectionState.election.id]
    if (
      (!actualState && subElectionState.loaded.election) ||
      (actualState && subElectionState.isAbleToVote !== actualState?.isAbleToVote)
    ) {
      addElection(subElectionState)
    }
  }, [subElectionState, elections])

  if (!renderWithLoaded) return null

  return <ElectionQuestion isDisabled={isDisabled} {...props} />
}
