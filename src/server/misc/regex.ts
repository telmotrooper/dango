/* Positive Lookbehind isn't supported by all browsers, but works on Node.
 * (?<=a)b matches the b (and only the b) in "cab", but does not match "bed" or "debt". */

export const wordsPreceededByAWord = /(?<=\w )\w[^ ]+/gi
