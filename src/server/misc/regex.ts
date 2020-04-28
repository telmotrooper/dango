/* Positive Lookbehind isn't supported by all browsers, but works on Node.
 * (?<=a)b matches the b (and only the b) in "cab", but does not match "bed" or "debt".
 * 
 * g = all matches
 * i = case-insensitive
 * 
 * Useful page: https://regex101.com/ */

// TODO: This regex seems not to work with single character words (e.g. ent X { }), gotta fix it.
export const secondWordFound = /(?<=\w )\w[^ ]+/gi

export const allBetweenCurlyBrackets = /[^{]+(?=})/

export const allButWhitespace = /(\S)+/gi

// Matches "ent", but not "aent"
export const allFromEntUpToClosingCurlyBrackets = /(?:^|[^a])(?=(ent ))[^}]+}/gi

export const allFromTextUpToClosingCurlyBrackets = (text: string): RegExp =>
  new RegExp(`(?=(${text} ))[^}]+}`, "gi")
