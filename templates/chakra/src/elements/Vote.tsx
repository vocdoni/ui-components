import { Box, Card, CardBody, CardHeader, Flex } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Election, OrganizationAvatar, OrganizationDescription, OrganizationName } from '@vocdoni/chakra-components'
import { OrganizationProvider } from '@vocdoni/react-providers'
import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'

const Vote = () => {
  const election = useLoaderData() as PublishedElection

  return (
    <OrganizationProvider id={election.organizationId}>
      <Card>
        <CardHeader>
          <Flex gap='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <OrganizationAvatar maxW='200px' />

              <Box flex='1'>
                <OrganizationName as='h1' fontSize='2rem' fontWeight='bold' />
                <OrganizationDescription />
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody borderTop='3px solid' borderColor='blue.700'>
          <Election election={election} ConnectButton={ConnectButton} />
        </CardBody>
      </Card>
    </OrganizationProvider>
  )
}

export default Vote
