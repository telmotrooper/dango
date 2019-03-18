import { Request, Response, Router } from "express"

import erToCypher from "../misc/erToCypher"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { er } = req.body

  const cypherCode = erToCypher(er)

  res.end(cypherCode)
})

export const CypherCode = router
