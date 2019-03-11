import { Request, Response, Router } from "express"
import parseAssociativeEntities from "../parser/parseAssociativeEntities"
import parseEntities from "../parser/parseEntities"
import parseSpecializations from "../parser/parseSpecializations"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { codebox } = req.body

  // const code = removeAccents(codebox)

  // console.log(codebox + "\n--------------------------------------------------")

  const temp = parseCode(codebox)

  // console.log(temp)

  res.sendStatus(200)
})

const parseCode = (code: string) => {
  // g = all matches
  // i = case-insensitive

  // Matches everything between curly braces:
  // /[^{\}]+(?=})/gi

  // Matches all entities:
  // /(?=(ent ))[^{\}]+/gi

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
  er["rel"] = parseSpecializations(rawRelationships)
  er["aent"] = parseAssociativeEntities(rawAssociativeEntities)
  er["spe"] = parseSpecializations(rawSpecializations)

  console.log(er)

  return { rawEntities, rawRelationships, rawAssociativeEntities, rawSpecializations }
}

export const Code = router
