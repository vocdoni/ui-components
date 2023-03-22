import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Field, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

interface HomeForm {
  processId: string
}

const Home = () => {
  const nav = useNavigate()
  const goto = (pid: string) => {
    const id = pid.replace('0x', '')
    return nav(`/process/${id}`)
  }

  const vals: HomeForm = {
    processId: '',
  }

  return (
    <VStack spacing={8}>
      <Text>Specify a process ID to easily navigate to it:</Text>
      <Formik initialValues={vals} onSubmit={(values) => goto(values.processId)}>
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl isInvalid={!!errors.processId && touched.processId}>
              <InputGroup>
                <Field
                  as={Input}
                  autoFocus
                  name='processId'
                  type='text'
                  validate={(value: string) => {
                    if (value.length <= 32) {
                      return 'Specify a proper process id'
                    }
                  }}
                  placeholder='0x0230...'
                />
                <InputRightElement>
                  <Button type='submit' size='xs' mr={2}>
                    Go
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.processId}</FormErrorMessage>
            </FormControl>
          </form>
        )}
      </Formik>
    </VStack>
  )
}

export default Home
