/**
 * Ensures a hex (0x) prefix is in the given string.
 *
 * @param address Address string to be hex enforced
 * @returns
 */
export const enforceHexPrefix = (address?: string) =>
  !address ? '' : address.startsWith('0x') ? address : `0x${address}`

/**
 * Compares two hex strings checking if they're the same. It ensures both
 * have hex prefix and are lowercase.
 *
 * @param {string} hex1
 * @param {string} hex2
 * @returns {boolean}
 */
export const areEqualHexStrings = (hex1?: string, hex2?: string) => {
  if (!hex1 || !hex2) return false
  if (hex1 === hex2) return true

  return enforceHexPrefix(hex1.toLocaleLowerCase()) === enforceHexPrefix(hex2.toLowerCase())
}

/**
 * Theoretically, all errors from the SDK should be returned as strings, but this is not true
 * for any error coming from the signer (which is, in part, coming from the SDK). That's why
 * we need to properly cast them to strings. Note we're not using error instanceof Error because
 * it just not works for many signer errors.
 *
 * @param {Error|string} error The error to be casted
 * @returns {string}
 */
export const errorToString = (error: Error | string): string => {
  if (typeof error !== 'string' && 'message' in error) {
    return error.message
  }

  return error
}
