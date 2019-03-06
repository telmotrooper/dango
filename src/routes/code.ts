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

  const er: any = {
    ent: [],
    rel: [],
    aent: [],
    spe: [],
  }

  if (rawEntities) {
    for (const ent of rawEntities) {
      const id = ent.match(/(?<=\w )\w[^ ]+/gi)

      if (id) {
        er["ent"].push(
          {
            id: id[0],
          },
        )
      }
    }
  }

  if (rawRelationships) {
    for (const rel of rawRelationships) {
      const id = rel.match(/(?<=\w )\w[^ ]+/gi)

      if (id) {
        er["rel"].push(
          {
            id: id[0],
          },
        )
      }
    }
  }

  if (rawAssociativeEntities) {
    for (const aent of rawAssociativeEntities) {
      const id = aent.match(/(?<=\w )\w[^ ]+/gi)

      if (id) {
        er["aent"].push(
          {
            id: id[0],
          },
        )
      }
    }
  }

  if (rawSpecializations) {
    for (const spe of rawSpecializations) {
      let id = spe.match(/[^{\}]+(?=\()/gi)
      if (id) {id = id[0].match(/\w[^ ]+/gi) }

      if (id) {
        er["spe"].push(
          {
            id: id[0],
          },
        )
      }
    }
  }

  console.log(er)

  return { rawEntities, rawRelationships, rawAssociatveEntities: rawAssociativeEntities, rawSpecializations }
}

const removeAccents = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export const Code = router
