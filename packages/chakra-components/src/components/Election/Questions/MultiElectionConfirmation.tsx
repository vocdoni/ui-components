import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from '@chakra-ui/modal'
import { chakra, omitThemingProps, useMultiStyleConfig } from '@chakra-ui/system'
import { useClient } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames } from '@vocdoni/sdk'
import { FieldValues } from 'react-hook-form'
import { ElectionStateStorage } from './MultiElectionContext'
import { useConfirm } from '../../layout'

export type MultiElectionConfirmationProps = {
  answers: Record<string, FieldValues>
  elections: ElectionStateStorage
}

export const MultiElectionConfirmation = ({ answers, elections, ...rest }: MultiElectionConfirmationProps) => {
  const mstyles = useMultiStyleConfig('ConfirmModal')
  const styles = useMultiStyleConfig('QuestionsConfirmation', rest)
  const { cancel, proceed } = useConfirm()
  const props = omitThemingProps(rest)
  const { localize } = useClient()
  return (
    <>
      <ModalHeader sx={mstyles.header}>{localize('confirm.title')}</ModalHeader>
      <ModalCloseButton sx={mstyles.close} />
      <ModalBody sx={mstyles.body}>
        <Text sx={styles.description}>{localize('vote.confirm')}</Text>
        {Object.values(elections).map(({ election, voted, isAbleToVote }) => {
          if (voted)
            return (
              <chakra.div __css={styles.question} key={election.id}>
                <chakra.div __css={styles.title}>{election.title.default}</chakra.div>
                <chakra.div __css={styles.answer}>{localize('vote.already_voted')}</chakra.div>
              </chakra.div>
            )
          if (!isAbleToVote)
            return (
              <chakra.div __css={styles.question} key={election.id}>
                <chakra.div __css={styles.title}>{election.title.default}</chakra.div>
                <chakra.div __css={styles.answer}>{localize('vote.not_able_to_vote')}</chakra.div>
              </chakra.div>
            )
          return (
            <Box key={election.id} {...props} sx={styles.box}>
              {election.questions.map((q, k) => {
                if (election.resultsType.name === ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION) {
                  const choice = q.choices.find((v) => v.value === parseInt(answers[election.id][k.toString()], 10))
                  return (
                    <chakra.div key={k} __css={styles.question}>
                      <chakra.div __css={styles.title}>{q.title.default}</chakra.div>
                      <chakra.div __css={styles.answer}>{choice?.title.default}</chakra.div>
                    </chakra.div>
                  )
                }
                const choices = answers[election.id][0]
                  .map((a: string) =>
                    q.choices[Number(a)] ? q.choices[Number(a)].title.default : localize('vote.abstain')
                  )
                  .map((a: string) => (
                    <span>
                      - {a}
                      <br />
                    </span>
                  ))

                return (
                  <chakra.div key={k} __css={styles.question}>
                    <chakra.div __css={styles.title}>{q.title.default}</chakra.div>
                    <chakra.div __css={styles.answer}>{choices}</chakra.div>
                  </chakra.div>
                )
              })}
            </Box>
          )
        })}
      </ModalBody>
      <ModalFooter sx={mstyles.footer}>
        <Button onClick={cancel!} variant='ghost' sx={mstyles.cancel}>
          {localize('confirm.cancel')}
        </Button>
        <Button onClick={proceed!} sx={mstyles.confirm}>
          {localize('confirm.confirm')}
        </Button>
      </ModalFooter>
    </>
  )
}
