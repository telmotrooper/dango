import parseAssociativeEntities from "../server/parser/parseAssociativeEntities"
import parseEntities from "../server/parser/parseEntities"
import parseRelationships from "../server/parser/parseRelationships"
import parseSpecializations from "../server/parser/parseSpecializations"
import { ER } from "../server/misc/interfaces"

const parseERCode = (code: string): ER => {
  // g = all matches
  // i = case-insensitive

  // classify objects, note: positive lookahead regex seems not to be supported by Firefox
  const rawEntities = code.match(/(?:^|[^a])(?=(ent ))[^}]+}/gi) // match "ent", but not "aent"
  const rawRelationships = code.match(/(?=(rel ))[^}]+}/gi)
  const rawAssociativeEntities = code.match(/(?=(aent ))[^}]+}/gi)
  const rawSpecializations = code.match(/(?=(spe ))[^}]+}/gi)

  const er: ER = {
    ent: [],
    rel: [],
    aent: [],
    spe: [],
  }

  er["ent"] = parseEntities(rawEntities)
  er["rel"] = parseRelationships(rawRelationships)
  er["aent"] = parseAssociativeEntities(rawAssociativeEntities, er["rel"])
  er["spe"] = parseSpecializations(rawSpecializations)

  return er
}

export default parseERCode
