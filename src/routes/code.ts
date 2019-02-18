import { Request, Response, Router } from "express"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { codebox } = req.body

  console.log(codebox)

  res.sendStatus(200)
})

export const Code = router
