@vocdoni/react-providers
========================

Package with react context & providers that help react developers create voting
applications.

Installation
------------

Using your favorite package manager:

~~~bash
yarn add @vocdoni/react-providers
~~~

Usage
-----

The very first step is to add the `<ClientProvider />` as a wrapper of your
application or, at least, of your election:

~~~tsx
import { ClientProvider } from '@vocdoni/chakra-components'

const App = () => {
  const signer = /* any ethers based signer */
  return (
    <ClientProvider env='stg' signer={signer}>
      {/* your actual app code */}
    </ClientProvider>
  )
}
~~~

`ClientProvider` is a dependency of the other providers, so you'll have to
ensure you initialize that one as the parent.

### hooks

- `useClient` allows you to interact with the `ClientProvider` layer. All the
  methods it exports allow you to use the client while interacting with the
  context/state:
    + `fetchAccount`
    + `createAccount`
    + `setClient`: allows you to change the client during runtime
    + `localize`: internal method used for localization
    + `setSigner`: allows you to change the signer during runtime
    + `generateSigner`: allows you to *generate* a signer
- `useElection` allows you to interact with the `ElectionProvider` layer. As per
  the `useClient` methods, anything exported here updates with the context:
    + `fetchElection`
    + `setClient`: allows you to change the client at election layer level
    (used by flows like the spreadsheet/csv login one)
    + `vote`: A helper method to vote, using the current context info.
- `useOrganization`:
  + `fetch`
  + `update`

License
-------

This components library is licensed under the [GNU Affero General Public License
v3.0][license].

    Vocdoni UI React Providers
    Copyright (C) 2023 Vocdoni Roots MCU

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

[license]: ./LICENSE
