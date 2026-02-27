<p align="center" width="100%">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://developer.vocdoni.io/img/vocdoni_logotype_full_blank.svg" />
      <source media="(prefers-color-scheme: light)" srcset="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
      <img alt="Star History Chart" src="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
  </picture>
</p>

<p align="center" width="100%">
    <a href="https://github.com/vocdoni/ui-components/commits/main/"><img src="https://img.shields.io/github/commit-activity/m/vocdoni/ui-components" /></a>
    <a href="https://github.com/vocdoni/ui-components/issues"><img src="https://img.shields.io/github/issues/vocdoni/ui-components" /></a>
    <a href="https://github.com/vocdoni/ui-components/actions/workflows/test.yml/"><img src="https://github.com/vocdoni/ui-components/actions/workflows/test.yml/badge.svg" /></a>
    <a href="https://discord.gg/xFTh8Np2ga"><img src="https://img.shields.io/badge/discord-join%20chat-blue.svg" /></a>
    <a href="https://twitter.com/vocdoni"><img src="https://img.shields.io/twitter/follow/vocdoni.svg?style=social&label=Follow" /></a>
</p>


  <div align="center">
    Vocdoni is the first universally verifiable, censorship-resistant, anonymous, and self-sovereign governance protocol. <br />
    Our main aim is a trustless voting system where anyone can speak their voice and where everything is auditable. <br />
    We are engineering building blocks for a permissionless, private and censorship resistant democracy.
    <br />
    <a href="https://developer.vocdoni.io/"><strong>Explore the developer portal »</strong></a>
    <br />
    <h3>More About Us</h3>
    <a href="https://vocdoni.io">Vocdoni Website</a>
    |
    <a href="https://vocdoni.app">Web Application</a>
    |
    <a href="https://explorer.vote/">Blockchain Explorer</a>
    |
    <a href="https://law.mit.edu/pub/remotevotingintheageofcryptography/release/1">MIT Law Publication</a>
    |
    <a href="https://chat.vocdoni.io">Contact Us</a>
    <br />
    <h3>Key Repositories</h3>
    <a href="https://github.com/vocdoni/vocdoni-node">Vocdoni Node</a>
    |
    <a href="https://github.com/vocdoni/vocdoni-sdk/">Vocdoni SDK</a>
    |
    <a href="https://github.com/vocdoni/ui-components">UI Components</a>
    |
    <a href="https://github.com/vocdoni/ui-scaffold">Application UI</a>
    |
    <a href="https://github.com/vocdoni/census3">Census3</a>
  </div>

# @vocdoni/react-providers

This package includes react context & providers for integration with the Vocdoni protocol via the [Vocdoni SDK](https://developer.vocdoni.io/sdk).


The best place to learn about using this package is the [developer portal](https://developer.vocdoni.io/ui-components).

### Table of Contents
- [Getting Started](#getting-started)
- [Reference](#reference)
- [Examples](#examples)
- [Preview](#preview)
- [Disclaimer](#disclaimer)
- [Contributing](#contributing)
- [License](#license)


## Getting Started


Using your favorite package manager:

~~~bash
yarn add @vocdoni/react-providers
~~~

The very first step is to add the `<ClientProvider />` as a wrapper of your application or, at least, of your election:

~~~tsx
import { ClientProvider } from '@vocdoni/react-providers'

const App = () => {
  const signer = /* any ethers based signer */
  return (
    <ClientProvider env='stg' signer={signer}>
      {/* your actual app code */}
    </ClientProvider>
  )
}
~~~

`ClientProvider` is a dependency of the other providers, so you'll have to ensure you initialize it first as the parent.

## i18n (i18next)

This package relies on `i18next` + `react-i18next`. Your app must initialize i18next and provide the `I18nextProvider`.

Example initialization:

~~~ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { reactProvidersResources, reactProvidersNamespace } from '@vocdoni/react-providers'

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: reactProvidersResources, // merge with your app resources
  ns: [reactProvidersNamespace],
  defaultNS: reactProvidersNamespace,
})
~~~

### Extraction guidance

We export base resources so you can merge them with your app translations:

~~~ts
import { reactProvidersResources } from '@vocdoni/react-providers'
~~~

If you want to scan for keys in workspace/local dev (monorepo), point your extractor to the source:

~~~js
// i18next-parser.config.cjs
module.exports = {
  locales: ['en'],
  defaultNamespace: 'react-providers',
  namespaceSeparator: ':',
  keySeparator: '.',
  input: ['../packages/react-providers/src/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
}
~~~

For published installs, the package ships `dist` only. Do not scan `node_modules`. Scan your app
code and merge with `reactProvidersResources` instead.

### How to create your translation JSON files

If you want to add a new language, use the exported base resources as the key template and fill in
translations on the app side.

Example: create `src/locales/es/react-providers.json`

~~~ts
import { reactProvidersResources, reactProvidersNamespace } from '@vocdoni/react-providers'

const base = reactProvidersResources.en[reactProvidersNamespace]

// Then translate values into your JSON file using the same keys:
// src/locales/es/react-providers.json
// {
//   "errors": {
//     "unauthorized": "No autorizado para votar"
//   }
// }
~~~

Load it with i18next:

~~~ts
import esReactProviders from './locales/es/react-providers.json'

i18n.addResourceBundle('es', reactProvidersNamespace, esReactProviders, true, true)
~~~

## Reference

The developer portal includes a [reference](https://developer.vocdoni.io/ui-components) for using the `@vocdoni/react-providers` package.

## Examples

You can find mock-functional usage of the react providers in the ui-components [documentation](https://developer.vocdoni.io/ui-components/Election). There is also real-world usage of many of the providers from this package in the [code](https://github.com/vocdoni/ui-scaffold) for the Vocdoni application front-end.

## Preview

In addition to the live examples in the documentation, you can see this code in use at https://app.vocdoni.io/

## Disclaimer

This project is a WIP and is subject to continuous changes during its
development. We encourage you to review this repository and the developer portal for any changes.

## Contributing

While we welcome contributions from the community, we do not track all of our issues on Github and we may not have the resources to onboard developers and review complex pull requests. That being said, there are multiple ways you can get involved with the project.

Please review our [development guidelines](https://developer.vocdoni.io/development-guidelines).

## License

This repository is licensed under the [GNU Affero General Public License v3.0.](./LICENSE)

    Vocdoni UI React Components
    Copyright (C) 2024 Vocdoni Association

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

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
