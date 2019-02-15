import { Request, Response, Router } from "express"

const router: Router = Router()

router.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "Dango", message: "Write your code" })
})

export const Index = router
