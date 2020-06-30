/* Positive Lookbehind isn't supported by all browsers, but works on Node.
 * (?<=a)b matches the b (and only the b) in "cab", but does not match "bed" or "debt".
 * 
 * g = all matches
 * i = case-insensitive
 * 
 * Useful page: https://regex101.com/ */

export const secondWordFound = /(?<=\w )[^\s]+/gi

export const allBetweenCurlyBrackets = /[^{]+(?=})/

export const allButWhitespace = /(\S)+/gi

/* Word boundary (\b) prevents "aent" from being matched by "ent" and it also prevents
 * issues when a protected word are used as part of an entity title, e.g. "ent appointment". */
export const allFromTextUpToClosingCurlyBrackets = (text: string): RegExp =>
  new RegExp(`(?=(\\b${text} ))[^}]+}`, "gi")
