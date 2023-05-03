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
