@vocdoni/react-voting
==========================

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
import { theme } from '@vocdoni/react-voting'

export const App = () => (
  <ChakraProvider theme={extendTheme(theme)}>
    {/* YOUR APP CONTENTS */}
  </ChakraProvider>
)
~~~

As you can see, we're importing a custom defined theme from
`@vocdoni/react-voting`, but at the same time, we're using `extendTheme`.
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
import { theme as vtheme } from '@vocdoni/react-voting'

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

The easiest way to integrate a voting would be to just import the `ViewVote`
component:

~~~tsx
import { ViewVote } from '@vocdoni/react-voting'
import { IElection } from '@vocdoni/sdk/dist/api/election'

const CustomVoteComponent = ({data: IElection}) => {
  return <ViewVote data={data} />
}
~~~


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
import { theme as vtheme, viewVoteAnatomy } from '@vocdoni/react-voting'

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
import { Image } from '@vocdoni/react-voting'

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

[components structure]: #components-structure
[components anatomy]: #components-anatomy
[chakra theming]: https://chakra-ui.com/docs/styled-system/customize-theme#customizing-theme-tokens
[advanced theming]: https://chakra-ui.com/docs/styled-system/advanced-theming
[multipart components]: https://chakra-ui.com/docs/styled-system/component-style#styling-multipart-components
[questions]: #questions
[theme path]: ./src/theme
[chakra template]: ../../templates/chakra/src/theme
[css props]: #styling-via-props
