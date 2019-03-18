import { Request, Response, Router } from "express"

import parseCode from "../parser/parseCode"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { er } = req.body

  const erCode = JSON.parse(er)

  console.log(erCode)

  res.sendStatus(200)
})

export const CypherCode = router
