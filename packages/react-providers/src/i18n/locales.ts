import { RecursivePartial } from '../types'

export const locales = {
  errors: {
    unauthorized: 'Not authorized to vote',
  },
}

export type Locale = RecursivePartial<typeof locales>
