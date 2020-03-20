import { Request, Response, Router } from "express"

import { driver } from "../misc/neo4jDriver"

const router: Router = Router()

router.get("/", async (req: Request, res: Response) => {
  const session = driver.session()

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await session.run("MATCH (n) RETURN n LIMIT 5")

    session.close()
    res.sendStatus(200)

  } catch (error) {
    // console.error(error)

    session.close()
    res.sendStatus(503) // Service Unavailable
  }
})

export const TestDB = router
