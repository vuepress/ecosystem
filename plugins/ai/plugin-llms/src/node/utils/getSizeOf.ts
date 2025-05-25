import byteSize from 'byte-size'

/**
 * Returns a string's size in bytes.
 *
 * @param string - The input string whose size needs to be determined.
 * @returns A size string (e.g., "1.2 KB", "500 B").
 */
export const getSizeOf = (string: string): string =>
  byteSize(new Blob([string]).size).toString()
