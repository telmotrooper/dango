import parseAssociativeEntities from "./parseAssociativeEntities"
import parseEntities from "./parseEntities"
import parseRelationships from "./parseRelationships"
import parseSpecializations from "./parseSpecializations"
import { ER } from "../misc/interfaces"

const parseERCode = (code: string): ER => {
  // g = all matches
  // i = case-insensitive

  // classify objects
  const rawEntities = code.match(/(?:^|[^a])(?=(ent ))[^\}]+}/gi) // match "ent", but not "aent"
  const rawRelationships = code.match(/(?=(rel ))[^\}]+}/gi)
  const rawAssociativeEntities = code.match(/(?=(aent ))[^\}]+}/gi)
  const rawSpecializations = code.match(/(?=(spe ))[^\}]+}/gi)

  const er: ER = {
    ent: [],
    rel: [],
    aent: [],
    spe: [],
  }

  er["ent"] = parseEntities(rawEntities)
  er["rel"] = parseRelationships(rawRelationships)
  er["aent"] = parseAssociativeEntities(rawAssociativeEntities)
  er["spe"] = parseSpecializations(rawSpecializations)

  return er
}

export default parseERCode
