import byteSize from 'byte-size'

/**
 * Get string size in human-readable format
 *
 * @param string - Input string to measure
 * @returns Size string (e.g., "1.2 KB", "500 B")
 */
export const getSizeOf = (string: string): string =>
  byteSize(new Blob([string]).size).toString()
