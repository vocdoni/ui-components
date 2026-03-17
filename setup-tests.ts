import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'
import React from 'react'
import { server } from './mocks/server'

let consoleErrorSpy: ReturnType<typeof vi.spyOn> | undefined
let consoleWarnSpy: ReturnType<typeof vi.spyOn> | undefined

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
afterEach(() => {
  consoleErrorSpy?.mockRestore()
  consoleWarnSpy?.mockRestore()
  server.resetHandlers()
})
// Clean up after the tests are finished.
afterAll(() => server.close())

beforeEach(() => {
  consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

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
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'Worker', { value: Worker })
  Object.defineProperty(window, 'MockedWindowURL', {
    value: {
      createObjectURL: () => 'blob:mocked',
      revokeObjectURL: () => {},
    },
  })
}

// required by any react component (almost all of them)
global.React = React

if (typeof globalThis.URL !== 'undefined') {
  globalThis.URL.createObjectURL = vi.fn()
}
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  })
) as ReturnType<typeof vi.fn>
