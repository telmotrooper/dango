import { Request, Response, Router } from "express"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { codebox } = req.body

  // const code = removeAccents(codebox)

  // console.log(codebox + "\n--------------------------------------------------")

  console.log(
    parseCode(codebox),
  )

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

  const er = {
    ent: [],
    rel: [],
    aent: [],
    spe: [],
  }

  if (rawEntities) {
    for (const entity of rawEntities) {
      const id = entity.match(/(?<=\w )\w[^ ]+/gi)

      if (id) {
        console.log(
          {
            id: id[0],
          },
        )
      }

    }
  }

  return { rawEntities, rawRelationships, rawAssociatveEntities: rawAssociativeEntities, rawSpecializations }
}

const removeAccents = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export const Code = router
