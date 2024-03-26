import { OrganizationAvatar, OrganizationDescription, OrganizationName } from '@vocdoni/chakra-components'
import { OrganizationProvider } from '@vocdoni/react-providers'
import { Account } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'

const Organization = () => {
  const org = useLoaderData() as Account

  return (
    <OrganizationProvider organization={org}>
      <OrganizationName />
      <OrganizationAvatar />
      <OrganizationDescription />
    </OrganizationProvider>
  )
}

export default Organization
