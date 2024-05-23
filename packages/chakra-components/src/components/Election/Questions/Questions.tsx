import { Alert, AlertIcon } from '@chakra-ui/alert'
import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { Wallet } from '@ethersproject/wallet'
import { useElection } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, IQuestion, PublishedElection } from '@vocdoni/sdk'
import { ReactNode, useEffect } from 'react'
import { FieldValues, FormProvider, SubmitErrorHandler, useForm } from 'react-hook-form'
import { useConfirm } from '../../layout'
import { QuestionsConfirmation } from './Confirmation'
import { QuestionField } from './Fields'
import { Voted } from './Voted'

export type ElectionQuestionsProps = ChakraProps & {
  confirmContents?: (election: PublishedElection, answers: FieldValues) => ReactNode
  onInvalid?: SubmitErrorHandler<FieldValues>
}

export const ElectionQuestions = (props: ElectionQuestionsProps) => {
  const {
    election,
    vote: bvote,
    voted,
    errors: { voting: error },
    localize,
    isAbleToVote,
    client,
  } = useElection()
  const fmethods = useForm()
  const styles = useMultiStyleConfig('ElectionQuestions')
  const questions: IQuestion[] | undefined = (election as PublishedElection)?.questions
  const { confirm } = useConfirm()
  const { confirmContents, onInvalid, ...rest } = props

  // reset form if account gets disconnected
  useEffect(() => {
    if (typeof client.wallet !== 'undefined' || !questions || !(election instanceof PublishedElection)) return

    fmethods.reset({
      ...questions.reduce((acc, question, index) => ({ ...acc, [index]: '' }), {}),
    })
  }, [client, election, fmethods, questions])

  if (!(election instanceof PublishedElection)) return null

  if (voted && !isAbleToVote) {
    return <Voted />
  }

  if (!questions || (questions && !questions?.length)) {
    return (
      <Alert variant='subtle' status='warning' sx={styles.alert}>
        <AlertIcon />
        {localize('empty')}
      </Alert>
    )
  }

  const vote = async (values: FieldValues) => {
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
        if (election.resultsType.properties.canAbstain && results.length < election.voteType.maxCount!) {
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

  return (
    <chakra.div __css={styles.wrapper} {...rest}>
      <FormProvider {...fmethods}>
        <Voted />
        <form onSubmit={fmethods.handleSubmit(vote, onInvalid)} id={`election-questions-${election.id}`}>
          {questions.map((question, qk) => (
            <QuestionField key={qk} index={qk.toString()} question={question} />
          ))}
          {error && (
            <Alert status='error' variant='solid' mb={3}>
              <AlertIcon />
              {error}
            </Alert>
          )}
        </form>
      </FormProvider>
    </chakra.div>
  )
}
