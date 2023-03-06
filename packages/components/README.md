@vocdoni/react-components
=========================

React components and hooks for easily integrating Vocdoni services.

Installing
----------

It's as easy as installing the required components:

~~~bash
yarn add @vocdoni/sdk @vocdoni/react-components react-markdown remark-gfm
~~~

Usage
-----

The easiest way to integrate a voting would be to just import the `Election`
component and specify it an id for your election:

~~~tsx
import { Election } from '@vocdoni/react-components'

const CustomVoteComponent = () => {
  return <Election id='your-awesome-election-process-uid' />
}
~~~

This will automatically instance the Election Provider with all the available
voting components. You can style it following the [instructions below][theming],
or you can also create your own vote view, based on the components used by the
`Election` component, and style it directly with props:

~~~tsx
import {
  ElectionProvider,
  ElectionTitle,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionDescription,
  HR,
  QuestionsForm,
} from '@vocdoni/react-components'

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
      <QuestionsForm />
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

Since we're using chakra's theming system, the way to style these voting
components is [the same as described in their documentation][chakra theming],
but using the custom components we defined (see [theming components] for more
details).

In order to start styling the voting components, you should use the
`ChakraProvider`, and customize the passed theme:

~~~tsx
// this can be imported from '@chakra-ui/react' too, but that's more generic
import { extendTheme } from '@chakra-ui/system'
import { theme } from '@vocdoni/react-components'

export const App = () => (
  <ChakraProvider theme={extendTheme(theme)}>
    {/* YOUR APP CONTENTS */}
  </ChakraProvider>
)
~~~

As you can see, we're importing a custom defined theme from
`@vocdoni/react-components`, but at the same time, we're using `extendTheme`.
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
import { theme } from '@vocdoni/react-components'

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
import { theme as vtheme } from '@vocdoni/react-components'

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
import { theme as vtheme } from '@vocdoni/react-components'

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
import { ElectionTitle, ElectionHeader } from '@vocdoni/react-components'

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

### Theming complex multipart components

Some components, like `<QuestionsForm />` follow a multipart component
structure. Please refer to the
[official chakra documentation][multipart components] for more info on how to
style these type of components.

Here's a small example styling the `QuestionsForm` component:

~~~ts
import { extendTheme, createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { theme as vtheme, questionsAnatomy } from '@vocdoni/react-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(questionsAnatomy)

const QuestionsForm = defineMultiStyleConfig({
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
    QuestionsForm,
  },
})

// this theme would then be used directly in your ChakraProvider instance
export default theme
~~~

You can check out each component's anatomy by checking
[their theme files][theme path].


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

[license]: ./LICENSE
[theming components]: #theming-components
[chakra theming]: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-component-styles
[advanced theming]: https://chakra-ui.com/docs/styled-system/advanced-theming
[multipart components]: https://chakra-ui.com/docs/styled-system/component-style#styling-multipart-components
[questions]: #questions
[theme path]: ./src/theme
[chakra template]: ../../templates/chakra/src/theme
[css props]: #styling-via-props
