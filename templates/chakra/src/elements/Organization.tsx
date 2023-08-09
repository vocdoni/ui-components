import { OrganizationAvatar, OrganizationDescription, OrganizationName } from '@vocdoni/chakra-components'
import { OrganizationProvider } from '@vocdoni/react-providers'
import { AccountData } from '@vocdoni/sdk'
import { useLoaderData } from 'react-router-dom'

const Organization = () => {
  const org = useLoaderData() as AccountData

  return (
    <OrganizationProvider organization={org}>
      <OrganizationName />
      <OrganizationAvatar />
      <OrganizationDescription />
    </OrganizationProvider>
  )
}

export default Organization
