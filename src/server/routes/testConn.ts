import { Request, Response, Router } from "express"

import { driver } from "../misc/neo4jDriver"

const router: Router = Router()

router.get("/", async (_: Request, res: Response) => {
  const session = driver.session()
  try {
    await session.run("MATCH (n) RETURN n LIMIT 1")
    await session.close()
    res.sendStatus(200)

  } catch (error) {
    await session.close()
    res.sendStatus(503) // Service Unavailable
  }
})

export const TestConn = router
