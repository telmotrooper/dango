/* Positive Lookbehind isn't supported by all browsers, but works on Node.
 * (?<=a)b matches the b (and only the b) in "cab", but does not match "bed" or "debt".
 * 
 * g = all matches
 * i = case-insensitive
 * 
 * Useful page: https://regex101.com/ */

export const secondWordFound = /(?<=\w )[^\s]+/

export const allBetweenCurlyBrackets = /[^{]+(?=})/

// This one works better with composite attributes.
export const allBetweenCurlyBracketsIncludingThem = /\{[^]+\}/

export const allButWhitespace = /\S+/g

// Useful to split lines without returning the empty ones.
export const linesIncludingWhitespace = /(?:[^\r\n])+/g

// Useful for removing indentantion, e.g. "  acquisition date" matches "acquisition date".
export const anythingFromFirstCharacter = /\b[^]+/

// Useful for isolating cardinalities, e.g. "(0,n)".
export const nonWhitespaceBetweenParentheses = /\(\S+\)/

// Get array [10, n] from string (10,n).
export const digitOrNGlobal = /\d+|n/g
export const digitOrN = /\d+|n/g

export const firstWordFound = /\S+/

export const allWords = /\S+/g

export const initialWhitespace = /^ +/

/* Word boundary (\b) prevents "aent" from being matched by "ent" and it also prevents
 * issues when a protected word is used as part of an entity title, e.g. "ent appointment". */
export const allFromTextUpToClosingCurlyBrackets = (text: string): RegExp =>
  new RegExp(`(?=(\\b${text} ))[^}]+}`, "gi")
