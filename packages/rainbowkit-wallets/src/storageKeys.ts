export const AuthStorageKeys = {
  Token: 'authToken',
  Expiry: 'authExpiry',
  Registered: 'authRegistered',
} as const

export type AuthStorageKey = (typeof AuthStorageKeys)[keyof typeof AuthStorageKeys]
