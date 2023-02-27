@vocdoni/react-components
=========================

React components and hooks for easily integrating Vocdoni services.

Theming
-------

Since we're using chakra's theming system, the way to style these voting
components is [the same as described in their documentation][chakra theming],
but using the custom components we defined (see [components anatomy] for more
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
See how our components are grainly styled below, in [components anatomy].

In case you want to add the voting components to a page and ensure chakra-ui
will not affect your theme, you may need to pass `resetCSS={false}` as a
component prop:

~~~tsx
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

Or you can simply ignore our theme and redefine it from the ground. All
multipart comonents export their helper theming methods, in case you want to
ignore our base theme.

### Components structure

- `components`: small components with part of the logic related to Vocdoni API
  (i.e. process questions).
- `components/views`: bigger components containing all the required components
  for full featured flows (i.e. full featured voting page).
- `components/layout`: small components used for layout purposes.

The easiest way to integrate a voting would be to just import the `Election`
component and specify it an id for your election:

~~~tsx
import { Election } from '@vocdoni/react-components'

const CustomVoteComponent = () => {
  return <Election id='your-awesome-election-process-uid' />
}
~~~

This will automatically instance the Election Provider with all the available
voting components. You can then style them following the instructions below, or
you can also create your own vote view, based on the components used by the
`Election` component:

~~~tsx
import {
  ElectionProvider,
  ElectionTitle,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionDescription,
  ElectionSeparator,
  QuestionsForm,
} from '@vocdoni/react-components'

const CustomVoteComponent = () => {
  return (
    <ElectionProvider id='your-awesome-election-process-uid'>
      <ElectionHeader />
      <ElectionTitle />
      <ElectionSchedule />
      <ElectionStatusBadge />
      <ElectionDescription />
      <ElectionSeparator />
      <QuestionsForm />
    </ElectionProvider>
  )
}
~~~

All these small components used in the view accept CSS props, like any other
chakra component:

~~~tsx
import {
  ElectionProvider,
  ElectionTitle,
  ElectionSchedule,
  ElectionStatusBadge,
  ElectionDescription,
  ElectionSeparator,
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
      <ElectionSeparator />
      <QuestionsForm />
    </ElectionProvider>
  )
}
~~~

Take a look at section below on more examples of how to style the voting view
and its components.


### Theming components

Most components follow a multipart component structure. Please refer to the
[official chakra documentation][multipart components] for more info on how to
style these type of components.

Other small components, like `Image` or `HR`, can be styled using the theme
provider or via [css props] but, since they're defined as parts of the multipart
components, you can define a main style for them, and also override styles for
each component part.

Here's a small example styling the ViewVote component :

~~~ts
import { extendTheme, createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { theme as vtheme, viewVoteAnatomy } from '@vocdoni/react-components'

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(viewVoteAnatomy)

const ViewVote = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    title: {
      paddingTop: '.5em',
      position: 'relative',
      marginTop: '-2.5em',
      background: 'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(255,255,255,0) 100%)'
    },
  }),
})

const theme = extendTheme(vtheme, {
  components: {
    ViewVote,
  },
})

// this theme would then be used directly in the ChakraProvider
export default theme
~~~

You can check out each component's anatomy by checking
[their theme files][theme path]. You can also take a look to the
[chakra template] we have in this project, where we're overwriting some of these
styles.

#### Styling via props

All components have all the features you would expect from a chakra component,
meaning you can style all components via component props too:

~~~tsx
import { Image } from '@vocdoni/react-components'

const App = () => (
  <Image
    borderRadius="full"
    boxSize="100px"

    src="https://picsum.photos/200"
    alt="random image"
  />
)
~~~

Note this is mostly usefull for small components, since big components css props
would only affect their wrappers. For styling their children components you'll
have to use the theme provider.


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
[components structure]: #components-structure
[components anatomy]: #components-anatomy
[chakra theming]: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-theme-tokens
[advanced theming]: https://chakra-ui.com/docs/styled-system/advanced-theming
[multipart components]: https://chakra-ui.com/docs/styled-system/component-style#styling-multipart-components
[questions]: #questions
[theme path]: ./src/theme
[chakra template]: ../../templates/chakra/src/theme
[css props]: #styling-via-props
