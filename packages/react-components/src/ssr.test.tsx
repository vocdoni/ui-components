// @vitest-environment node

import { Account, ElectionStatus, EnvOptions, PublishedElection, WeightedCensus } from '@vocdoni/sdk'
import { renderToString } from 'react-dom/server'
import { ComponentsProvider } from '~components/context/ComponentsProvider'
import { ElectionDescription } from '~components/Election/Description'
import { ElectionStatusBadge } from '~components/Election/StatusBadge'
import { ElectionTitle } from '~components/Election/Title'
import { OrganizationName } from '~components/Organization/Name'
import { ClientProvider } from '~providers/client'
import { ElectionProvider } from '~providers/election/ElectionProvider'
import { OrganizationProvider } from '~providers/organization/OrganizationProvider'
import { TestProvider } from '~providers/test-utils'

describe('SSR compatibility', () => {
  it('server-renders election components from serialized election data', () => {
    const election = JSON.parse(
      JSON.stringify(
        // @ts-ignore
        PublishedElection.build({
          id: '0x123',
          title: 'Server election',
          description: 'Rendered on the server',
          status: ElectionStatus.ONGOING,
          startDate: '2026-01-01T00:00:00.000Z',
          endDate: '2026-12-31T00:00:00.000Z',
          creationTime: '2025-12-01T00:00:00.000Z',
          census: new WeightedCensus(),
        })
      )
    )

    const html = renderToString(
      <TestProvider>
        <ComponentsProvider>
          <ClientProvider env={EnvOptions.DEV}>
            <ElectionProvider election={election}>
              <ElectionTitle />
              <ElectionDescription />
              <ElectionStatusBadge />
            </ElectionProvider>
          </ClientProvider>
        </ComponentsProvider>
      </TestProvider>
    )

    expect(html).toContain('Server election')
    expect(html).toContain('Rendered on the server')
  })

  it('server-renders organization components from serialized organization data', () => {
    const organization = JSON.parse(
      JSON.stringify({
        account: new Account({ name: 'Server organization' }),
        address: '0xB38492889D136054A29EC37B238Cc8bBF4f3DEe7',
        balance: 0,
        electionIndex: 0,
        nonce: 0,
        feesCount: 0,
        sik: '',
        transfersCount: 0,
      })
    )

    const html = renderToString(
      <TestProvider>
        <ComponentsProvider>
          <ClientProvider env={EnvOptions.DEV}>
            <OrganizationProvider organization={organization}>
              <OrganizationName />
            </OrganizationProvider>
          </ClientProvider>
        </ComponentsProvider>
      </TestProvider>
    )

    expect(html).toContain('Server organization')
  })
})
