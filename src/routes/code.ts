import { Request, Response, Router } from "express"

const router: Router = Router()

router.post("/", (req: Request, res: Response) => {
  const { codebox } = req.body

  const code = removeAccents(codebox)

  console.log(code + "\n--------------------------------------------------")
  console.log(parseCode(codebox))

  res.sendStatus(200)
})

const parseCode = (code: string) => {
  // g = all matches
  // i = case-insensitive
  const output = code.match(/ent/gi)

  return output
}

const removeAccents = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export const Code = router
