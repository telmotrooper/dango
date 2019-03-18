import { Request, Response, Router } from "express"

import parseCode from "../parser/parseCode"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { codebox } = req.body
  const er = parseCode(codebox)

  res.json(er)
})

export const ERCode = router
