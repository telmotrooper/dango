import parseAssociativeEntities from "./parseAssociativeEntities"
import parseEntities from "./parseEntities"
import parseRelationships from "./parseRelationships"
import parseSpecializations from "./parseSpecializations"
import { ER } from "../misc/interfaces"
import { allFromSpeUpToClosingCurlyBrackets } from "../misc/regex"

const parseERCode = (code: string): ER => {
  // g = all matches
  // i = case-insensitive

  // 1st level regexes - classify objects
  const rawEntities = code.match(/(?:^|[^a])(?=(ent ))[^}]+}/gi) // match "ent", but not "aent"
  const rawRelationships = code.match(/(?=(rel ))[^}]+}/gi)
  const rawAssociativeEntities = code.match(/(?=(aent ))[^}]+}/gi)
  const rawSpecializations = code.match(allFromSpeUpToClosingCurlyBrackets)

  const er: ER = {
    ent: [],
    rel: [],
    aent: [],
    spe: [],
  }

  // 2nd level regex
  er["ent"] = parseEntities(rawEntities)
  er["rel"] = parseRelationships(rawRelationships)
  er["aent"] = parseAssociativeEntities(rawAssociativeEntities, er["rel"])
  er["spe"] = parseSpecializations(rawSpecializations)

  return er
}

export default parseERCode
