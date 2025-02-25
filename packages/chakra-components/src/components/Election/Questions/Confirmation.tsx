import {
  Box,
  Button,
  chakra,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  omitThemingProps,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react'
import { useClient } from '@vocdoni/react-providers'
import { ElectionResultsTypeNames, PublishedElection } from '@vocdoni/sdk'
import { FieldValues } from 'react-hook-form'
import { useConfirm } from '../../layout'

export type QuestionsConfirmationProps = {
  answers: FieldValues
  election: PublishedElection
}

export const QuestionsConfirmation = ({ answers, election, ...rest }: QuestionsConfirmationProps) => {
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
        <Box {...props} sx={styles.box}>
          <Text sx={styles.description}>{localize('vote.confirm')}</Text>
          {election.questions.map((q, k) => {
            if (election.resultsType.name === ElectionResultsTypeNames.SINGLE_CHOICE_MULTIQUESTION) {
              const choice = q.choices.find((v) => v.value === parseInt(answers[k.toString()], 10))
              return (
                <chakra.div key={k} __css={styles.question}>
                  <chakra.div __css={styles.title}>{q.title.default}</chakra.div>
                  <chakra.div __css={styles.answer}>{choice?.title.default}</chakra.div>
                </chakra.div>
              )
            }

            const choices = (answers[0] || ['-1'])
              .map((a: string) =>
                q.choices[Number(a)] ? q.choices[Number(a)].title.default : localize('vote.abstain')
              )
              .map((a: string) => (
                <span key={a}>
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
