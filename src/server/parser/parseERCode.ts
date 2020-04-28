import { parseAssociativeEntities } from "./parseAssociativeEntities"
import { parseEntities } from "./parseEntities"
import { parseRelationships } from "./parseRelationships"
import { parseSpecializations } from "./parseSpecializations"
import { ER } from "../misc/interfaces"
import { allFromEntUpToClosingCurlyBrackets, allFromTextUpToClosingCurlyBrackets } from "../misc/regex"

const parseERCode = (code: string): ER => {
  // 1st level regexes - classify objects
  const rawEntities: string[] = code.match(allFromEntUpToClosingCurlyBrackets) ?? []
  const rawRelationships: string[] = code.match(allFromTextUpToClosingCurlyBrackets("rel")) ?? []
  const rawAssociativeEntities: string[] = code.match(allFromTextUpToClosingCurlyBrackets("aent")) ?? []
  const rawSpecializations: string[] = code.match(allFromTextUpToClosingCurlyBrackets("spe")) ?? []

  const er: ER = {
    ent: [],
    rel: [],
    aent: [],
    spe: [],
  }

  // 2nd level regexes
  er["ent"] = parseEntities(rawEntities)
  er["rel"] = parseRelationships(rawRelationships)
  er["aent"] = parseAssociativeEntities(rawAssociativeEntities, er["rel"])
  er["spe"] = parseSpecializations(rawSpecializations)

  return er
}

export { parseERCode }
