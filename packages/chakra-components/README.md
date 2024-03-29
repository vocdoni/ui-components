<div align="center">

![vocdoni logo]

[![chakra-components badge]][npm link]
[![Join Discord][discord badge]][discord invite]
[![Twitter Follow][twitter badge]][twitter follow]

</div>

UI Components with Chakra UI
============================

Chakra ui components for easily integrating Vocdoni services.

Installing
----------

You'll first need to have a project with chakra installed and configured. Follow
their [official documentation][chakra getting started] in order to do so.

After that, you can add the required vocdoni components dependencies:

~~~bash
yarn add @vocdoni/sdk @vocdoni/chakra-components react-markdown remark-gfm
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

> Beware that you'll also see a `ClientProvider` also from
> `@vocdoni/react-providers`. You should always be using the one included with
> `@vocdoni/chakra-components` in order to have all the features it provides.
>
> Note this also happens with other components and providers. If you are using
> `@vocdoni/chakra-components`, you should always prioritize its exports over
> the ones from `@vocdoni/react-providers`.

Note `env` can be any of the [SDK available environments][sdk environments],
either in string format, or using the SDK `EnvOptions` enum.

After that, the easiest way to integrate a voting would be to just import the
`Election` component and specify it an id for your election:

~~~tsx
import { Election } from '@vocdoni/chakra-components'

const CustomVoteComponent = () => {
  return <Election id='your-awesome-election-process-uid' />
}
~~~

This will automatically instance the Election Provider with all the available
voting components. You can style it following the [instructions below][theming],
and/or you can also create your own vote view, based on the components used by
the `Election` component, and style it directly with props:

~~~tsx
import {
  ElectionProvider,
  ElectionTitle,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionDescription,
  HR,
  ElectionQuestions,
} from '@vocdoni/chakra-components'

const CustomVoteComponent = () => {
  return (
    <ElectionProvider id='your-awesome-election-process-uid'>
      <ElectionHeader />
      <ElectionTitle
        p={5}
        mt={6}
        mb={8}
        textColor='red'
      />
      <ElectionSchedule textTransform='uppercase' />
      <ElectionStatusBadge variant='solid' colorScheme='teal' />
      <ElectionDescription fontFamily='monospace' />
      <HR />
      <ElectionQuestions />
    </ElectionProvider>
  )
}
~~~

Take a look at section below on more examples of how to style the voting
components.

> Note you won't see some required styles if you have not added the
> ChakraProvider to your project, see below for more details on this.

Theming
-------

Since these components use chakra's theming system, the way to style these
voting components is
[the same as described in their documentation][chakra theming], but using the
custom components we defined (see [theming components] for more details).

In order to start styling the voting components, you should use the
`ChakraProvider`, and customize the passed theme:

~~~tsx
// this can be imported from '@chakra-ui/react' too, but that's more generic
import { extendTheme } from '@chakra-ui/system'
import { theme } from '@vocdoni/chakra-components'

export const App = () => (
  <ChakraProvider theme={extendTheme(theme)}>
    {/* YOUR APP CONTENTS */}
  </ChakraProvider>
)
~~~

As you can see, we're importing a custom defined theme from
`@vocdoni/chakra-components`, but at the same time, we're using `extendTheme`.
This is because we're not merging our styles with the base chakra theme, both to
avoid a bigger bundle size and to ensure we don't unexpectedly overwrite styles.

The above example is the easiest way to get all the default styles up and
running, but you can always define your entire theme and ignore our base styles.
See how our components are grainly styled below, in [components structure].

In case you want to add the voting components to a page and ensure chakra-ui
will not affect your theme, you may need to pass `resetCSS={false}` as a
component prop:

~~~tsx
import { extendTheme } from '@chakra-ui/system'
import { theme } from '@vocdoni/chakra-components'

export const App = () => (
  <ChakraProvider resetCSS={false} theme={extendTheme(theme)}>
    {/* YOUR APP CONTENTS */}
  </ChakraProvider>
)
~~~

If you want to extend or change the theme, you can pass your changes as a second
argument to `extendTheme`:

~~~tsx
import { extendTheme } from '@chakra-ui/react'
import { theme as vtheme } from '@vocdoni/chakra-components'

const theme = extendTheme(vtheme, {
  // any theme changes would go here
  components: {
    // [...]
  },
})

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* YOUR APP CONTENTS */}
  </ChakraProvider>
)
~~~

We have applied a few amount of styles, so you can perfectly ignore our styles
and write them from the ground up.

### Theming components

Since you have components for every part of an election process, you can follow
the official Chakra documentation on how to customize component styles, and just
use our components where required.

Here's a small example styling the title and image of elections:

~~~ts
import { extendTheme, ComponentSingleStyleConfig } from '@chakra-ui/react'
import { theme as vtheme } from '@vocdoni/chakra-components'

const ElectionTitle : ComponentsStyleConfig = {
  baseStyle: {
    paddingTop: '.5em',
    position: 'relative',
    marginTop: '-2.5em',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(255,255,255,0) 100%)',
  }
}

const ElectionHeader : ComponentsStyleConfig = {
  baseStyle: {
    minHeight: '3em'
  }
}

const theme = extendTheme(vtheme, {
  components: {
    ElectionTitle,
    ElectionHeader,
  },
})

// this theme would then be used directly in your ChakraProvider instance
export default theme
~~~

#### Styling via props

All components have all the features you would expect from a chakra component,
meaning you can style all components via component props too:

~~~tsx
import { ElectionTitle, ElectionHeader } from '@vocdoni/chakra-components'

const App = () => (
  <ElectionProvider id='an-election-id'>
    <ElectionHeader
      borderRadius="full"
      boxSize="100px"

      src="https://picsum.photos/200"
      alt="random image"
    />
    <ElectionTitle
      as='h2'
      fontSize='50px'
    />
  </ElectionProvider>
)
~~~

#### Theming complex multipart components

Some components, like `<ElectionQuestions />` follow a multipart component
structure. Please refer to the
[official chakra documentation][multipart components] for more info on how to
style these type of components.

Here's a small example styling the `ElectionQuestions` component:

~~~ts
import { extendTheme, createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { theme as vtheme, questionsAnatomy } from '@vocdoni/chakra-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const ElectionQuestions = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    title: {
      color: 'lightblue',
    },
    description: {
      color: 'lightgreen',
    }
  }),
})

const theme = extendTheme(vtheme, {
  components: {
    ElectionQuestions,
  },
})

// this theme would then be used directly in your ChakraProvider instance
export default theme
~~~

You can check out each component's anatomy by checking
[their theme files][theme path].

### i18n

In order to change any of the texts contained in `@vocdoni/chakra-components`,
you must specify the locales object with all (or some of) the strings already
translated (you may use an external solution for that, or just set a single
language):

~~~tsx
const locales = {
  actions: {
    cancel_description: t('Cancel description'),
    // ... any other translated text, see the locales file for more details
  }
}
<ClientProvider locales={locales} />
~~~

Internally we deepmerge these translations, so you can choose to replace
all of the texts, or just some of them.

Also note that some texts come with variables and you should respect them, i.e.

~~~
Voting from {{ begin }} to {{ end }}
~~~

Check out the [locales file] in order to see all the available keys.

LICENSE
-------

This components library is licensed under the [GNU Affero General Public License
v3.0][license].

    Vocdoni UI React Components
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

[chakra getting started]: https://chakra-ui.com/getting-started
[license]: ./LICENSE
[theming]: #theming
[theming components]: #theming-components
[chakra theming]: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-component-styles
[advanced theming]: https://chakra-ui.com/docs/styled-system/advanced-theming
[multipart components]: https://chakra-ui.com/docs/styled-system/component-style#styling-multipart-components
[questions]: #questions
[theme path]: ./src/theme
[chakra template]: ../../templates/chakra/src/theme
[css props]: #styling-via-props
[sdk environments]: https://github.com/vocdoni/vocdoni-sdk#environment
[locales file]: ./src/i18n/locales.ts

[vocdoni logo]: https://docs.vocdoni.io/Logotype.svg
[chakra-components badge]: https://img.shields.io/npm/v/%40vocdoni%2Fchakra-components?label=%40vocdoni%2Fchakra-components
[discord badge]: https://img.shields.io/badge/discord-join%20chat-blue.svg
[twitter badge]: https://img.shields.io/twitter/follow/vocdoni?style=social&label=Follow

[discord invite]: https://discord.gg/xFTh8Np2ga
[twitter follow]: https://twitter.com/intent/user?screen_name=vocdoni
[npm link]: https://www.npmjs.com/package/@vocdoni/chakra-components
