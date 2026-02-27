export const reactProvidersNamespace = 'react-providers'
export const reactProvidersDefaultLanguage = 'en'

export const reactProvidersResources = {
  [reactProvidersDefaultLanguage]: {
    [reactProvidersNamespace]: {
      errors: {
        unauthorized: 'Not authorized to vote',
      },
    },
  },
}

export type Locale = {
  [key: string]: string | Locale
}
