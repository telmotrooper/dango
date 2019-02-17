import { Request, Response, Router } from "express"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  console.log(req.body)
  res.sendStatus(200)
})

export const Code = router
