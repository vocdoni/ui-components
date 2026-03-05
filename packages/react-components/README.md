<p align="center" width="100%">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://developer.vocdoni.io/img/vocdoni_logotype_full_blank.svg" />
      <source media="(prefers-color-scheme: light)" srcset="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
      <img alt="Vocdoni" src="https://developer.vocdoni.io/img/vocdoni_logotype_full_white.svg" />
  </picture>
</p>

# @vocdoni/react-components

Headless, framework-agnostic React components for Vocdoni UIs.

This package keeps business logic and component APIs while delegating visual rendering to overridable slots through `ComponentsProvider`.

### Table of Contents
- [Getting Started](#getting-started)
- [How To Use Components](#how-to-use-components)
- [How Customization Works](#how-customization-works)
  - [TypeScript](#typescript)
- [i18n (i18next)](#i18n-i18next)
- [Testing](#testing)
- [Reference](#reference)
- [License](#license)

## Getting Started

Install package and peer dependencies:

~~~bash
yarn add @vocdoni/react-components @vocdoni/react-providers @vocdoni/sdk react react-i18next i18next date-fns
~~~

If you use routed helpers (for example `RoutedPagination`), install router dependencies in your app where routing is configured.

Set providers at app root:

~~~tsx
import { ClientProvider, ComponentsProvider } from '@vocdoni/react-components'

export const App = () => (
  <ClientProvider env='stg'>
    <ComponentsProvider>{/* app */}</ComponentsProvider>
  </ClientProvider>
)
~~~

## How To Use Components

Users consume exported components normally by importing and rendering them:

~~~tsx
import { Election, OrganizationName, Pagination, Balance } from '@vocdoni/react-components'

export const Screen = () => (
  <>
    <Balance />
    <OrganizationName />
    <Election electionId='0x...' />
    <Pagination pagination={{ currentPage: 1, previousPage: 0, nextPage: 2, lastPage: 10, totalItems: 200 }} />
  </>
)
~~~

`ComponentsProvider` is optional. If you do not pass custom slots, built-in defaults are used.

## Default HTML Rendering

`@vocdoni/react-components` does not include a markdown parser dependency.

By default, description-like fields are rendered as trusted HTML (`dangerouslySetInnerHTML`).
If your app needs markdown parsing or sanitization, override the corresponding slots in `ComponentsProvider`.

## How Customization Works

The canonical customization API is a **flat object**:

~~~tsx
import type { ComponentsDefinition } from '@vocdoni/react-components'

const components: Partial<ComponentsDefinition> = {
  ElectionTitle: ({ title, ...props }) => <h1 {...props}>{title}</h1>,
  PaginationButton: ({ children, ...props }) => <button className='my-btn' {...props}>{children}</button>,
}
~~~

Then provide it:

~~~tsx
<ComponentsProvider components={components}>{/* app */}</ComponentsProvider>
~~~

The package also exports optional domain helper types and a merge helper for DX:

- `ElectionComponentsDefinition`
- `OrganizationComponentsDefinition`
- `PaginationComponentsDefinition`
- `AccountComponentsDefinition`
- `composeComponents(...partials)`

~~~tsx
import {
  composeComponents,
  type ElectionComponentsDefinition,
  type PaginationComponentsDefinition,
} from '@vocdoni/react-components'

const electionComponents: Partial<ElectionComponentsDefinition> = {
  ElectionTitle: ({ title }) => <h1>{title}</h1>,
}

const paginationComponents: Partial<PaginationComponentsDefinition> = {
  PaginationSummary: ({ text }) => <p>{text}</p>,
}

const components = composeComponents(electionComponents, paginationComponents)
~~~

No nested `components.election.*` API is used.

### TypeScript

For strongly typed slot overrides with UI-library props, use `defineComponent` with a slot key and your extra props:

~~~tsx
import { defineComponent, type ComponentsPartialDefinition } from '@vocdoni/react-components'
import type { HeadingProps } from '@chakra-ui/react'

const components: ComponentsPartialDefinition = {
  ElectionTitle: defineComponent<'ElectionTitle', HeadingProps>(({ title, ...props }) => (
    <h1 {...props}>{title}</h1>
  )),
}
~~~

This keeps both slot props (for example `title`, `description`, `label`) and your UI props strongly typed.

## i18n (i18next)

This package exports i18n resources in the same style as `@vocdoni/react-providers`:

- `reactComponentsNamespace`
- `reactComponentsDefaultLanguage`
- `reactComponentsResources`

Example setup:

~~~ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  reactComponentsNamespace,
  reactComponentsResources,
} from '@vocdoni/react-components'

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: reactComponentsResources,
  ns: [reactComponentsNamespace],
  defaultNS: reactComponentsNamespace,
})
~~~

Base English template:

`src/i18n/locales/en/react-components.json`

## Testing

From package directory:

~~~bash
pnpm lint
pnpm test
pnpm build
~~~

## Reference

https://developer.vocdoni.io/ui-components

## License

This repository is licensed under the [GNU Affero General Public License v3.0.](./LICENSE)
