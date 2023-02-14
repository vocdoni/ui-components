import { chakra, ChakraProps, useMultiStyleConfig } from '@chakra-ui/system'
import { QuestionsForm } from './QuestionsForm'

export const Questions = (props: ChakraProps) => {
  const styles = useMultiStyleConfig('Questions')

  return (
    <chakra.div __css={styles.wrapper} {...props}>
      <QuestionsForm />
    </chakra.div>
  )
}
Questions.displayName = 'Questions'
