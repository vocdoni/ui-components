// @ts-nocheck
import { ChakraProvider, theme } from '@chakra-ui/react'
import router from '@src/router'
import { render, RenderOptions } from '@testing-library/react'
import * as React from 'react'
import { RouterProvider } from 'react-router-dom'

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ChakraProvider theme={theme}>
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  </ChakraProvider>
)

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }
