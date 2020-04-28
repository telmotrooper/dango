/* Positive Lookbehind isn't supported by all browsers, but works on Node.
 * (?<=a)b matches the b (and only the b) in "cab", but does not match "bed" or "debt".
 *
 * Useful page: https://regex101.com/ */

export const wordsPreceededByAWord = /(?<=\w )\w[^ ]+/gi

export const allBetweenCurlyBrackets = /[^{]+(?=})/gi

export const allButWhitespace = /(\S)+/gi

export const allFromSpeUpToClosingCurlyBrackets = /(?=(spe ))[^}]+}/gi
