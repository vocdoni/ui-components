export const locales = {
  errors: {
    unauthorized: 'Not authorized to vote',
  },
}

export type Locale = {
  [key: string]: string | Locale
}
