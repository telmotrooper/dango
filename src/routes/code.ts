import { Request, Response, Router } from "express"
import parseAssociativeEntities from "../parser/parseAssociativeEntities"
import parseEntities from "../parser/parseEntities"
import parseRelationships from "../parser/parseRelationships"
import parseSpecializations from "../parser/parseSpecializations"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { codebox } = req.body
  const er = parseCode(codebox)

  res.json(er)
})

const parseCode = (code: string) => {
  // g = all matches
  // i = case-insensitive

  // classify objects
  const rawEntities = code.match(/(?:^|[^a])(?=(ent ))[^\}]+}/gi) // match "ent", but not "aent"
  const rawRelationships = code.match(/(?=(rel ))[^\}]+}/gi)
  const rawAssociativeEntities = code.match(/(?=(aent ))[^\}]+}/gi)
  const rawSpecializations = code.match(/(?=(spe ))[^\}]+}/gi)

  const er: any = {
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

export const Code = router
