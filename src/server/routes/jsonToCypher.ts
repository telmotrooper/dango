import { Request, Response, Router } from "express"

import { erToCypher } from "../cypher/erToCypher"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { er, strictMode } = req.body

  const cypherCode = erToCypher(er, strictMode)

  res.json(cypherCode)
})

export const jsonToCypher = router
