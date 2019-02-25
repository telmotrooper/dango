import { Request, Response, Router } from "express"
import fs from "fs"

// TODO: Find a way to use "import from" syntax
// tslint:disable-next-line:no-var-requires
const peg = require("pegjs")

const router: Router = Router()

const grammar = fs.readFileSync(__dirname + "/../misc/grammar.pegjs", "utf-8")
const parser = peg.generate(grammar)

router.post("/", (req: Request, res: Response) => {
  const { codebox } = req.body

  // console.log("Code:\n" + codebox + "\n")
  // console.log("Grammar:\n" + grammar)

  console.log(
    parser.parse(codebox),
  )

  res.sendStatus(200)
})

export const Code = router
