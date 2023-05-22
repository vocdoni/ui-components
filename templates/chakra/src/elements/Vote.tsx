import { Card, CardBody, CardHeader } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Election, OrganizationName, OrganizationProvider } from '@vocdoni/chakra-components'
import { PublishedElection } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'

const Vote = () => {
  const election = useLoaderData() as PublishedElection

  return (
    <OrganizationProvider id={election.organizationId}>
      <Card>
        <CardHeader>
          <OrganizationName />
        </CardHeader>
        <CardBody>
          <Election election={election} ConnectButton={ConnectButton} />
        </CardBody>
      </Card>
    </OrganizationProvider>
  )
}

export default Vote
