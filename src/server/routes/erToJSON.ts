import { Request, Response, Router } from "express"

import { parseERCode } from "../parser/parseERCode"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { codebox } = req.body
  const er = parseERCode(codebox)

  res.json(er)
})

export const erToJSON = router
