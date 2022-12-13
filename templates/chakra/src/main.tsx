import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { theme as vtheme } from '@vocdoni/components-voting'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import reportWebVitals from './reportWebVitals'
import router from './router'
import * as serviceWorker from './serviceWorker'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

const theme = extendTheme(vtheme)

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
      <ColorModeScript />
    </ChakraProvider>
  </StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
