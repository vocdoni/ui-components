import { AccountData, ArchivedAccountData, ensure0x, VocdoniSDKClient } from '@vocdoni/sdk'
import latinize from 'latinize'

/**
 * Ensures a hex (0x) prefix is in the given string.
 *
 * @param address Address string to be hex enforced
 * @returns
 */
export const enforceHexPrefix = (address?: string) => (!address ? '' : ensure0x(address))

/**
 * Theoretically, all errors from the SDK should be returned as strings, but this is not true
 * for any error coming from the signer (which is, in part, coming from the SDK). That's why
 * we need to properly cast them to strings. Note we're not using error instanceof Error because
 * it just not works for many signer errors.
 *
 * @param {any|unknown} error The error to be casted
 * @returns {string}
 */
export const errorToString = (error: any | unknown): string => {
  if (typeof error !== 'string' && 'message' in error) {
    return error.message
  }
  if (typeof error !== 'string' && 'reason' in error) {
    return error.reason
  }

  return error
}

/**
 * Normalizes text removing spaces and latinizing characters, in order to reduce as much as possible
 * the possible inputs. So a text like "this is A TèXt" will end up as "thisisatext".
 *
 * @param text Text string to be normalized
 * @returns string
 */
export const normalizeText = (text?: string): string => {
  if (!text) return ''

  const result = text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\.·:]/g, '.')
    .replace(/[`´]/g, "'")
    .normalize()
    .toLowerCase()

  return latinize(result)
}

/**
 * Generates a Wallet from a given row of data and a salt. The row of data should be an array of strings
 *
 * @param {string} salt A random string to be used as salt, the more random the better
 * @param {string} row The row to be used to generate the wallet
 * @returns {Wallet}
 */
export const walletFromRow = (salt: string, row: string[]) => {
  const normalized = row.map(normalizeText)
  normalized.push(salt)
  return VocdoniSDKClient.generateWalletFromData(normalized)
}

/**
 * Determines if the specified account is a Signer account (otherwise is considered
 * a Wallet account). Required to properly distinguish between the two types, since
 * tools like wagmi/viem require to have a Signer.
 *
 * @param {AccountData|ArchivedAccountData} account Account to be checked
 * @returns {boolean}
 */
export const isSignerAccount = (account: AccountData | ArchivedAccountData): account is AccountData => {
  return (account as AccountData).nonce !== undefined
}
