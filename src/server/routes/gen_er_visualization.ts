import { Request, Response, Router } from "express"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  // const { codebox } = req.body
  // const er = parseERCode(codebox)
  // res.json(er)
})

export const GenERVisualization = router
