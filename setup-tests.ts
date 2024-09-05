import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'
import React from 'react'
import { server } from './mocks/server'

// polyfill text encoder/decoder
Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
})

// Establish API mocking before all tests.
beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'warn',
  })
)
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

class Worker {
  private url
  private onmessage
  constructor(stringUrl) {
    this.url = stringUrl
    this.onmessage = () => {}
  }

  postMessage(msg) {
    this.onmessage(msg)
  }
  addEventListener() {}
  removeEventListener() {}
}

// required due to SDK dependency
Object.defineProperty(window, 'Worker', { value: Worker })
Object.defineProperty(window, 'MockedWindowURL', {
  value: {
    createObjectURL: () => 'blob:mocked',
    revokeObjectURL: () => {},
  },
})

// required by any react component (almost all of them)
global.React = React

global.URL.createObjectURL = jest.fn()
