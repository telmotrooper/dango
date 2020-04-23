import { Request, Response, Router } from "express"

import { driver } from "../misc/neo4jDriver"

const router: Router = Router()

router.post("/", async (req: Request, res: Response) => {
  const session = driver.session()

  // const { codebox } = req.body

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await session.run("MATCH (n) RETURN n LIMIT 5")

    session.close()
    driver.close()
    res.sendStatus(200)

  } catch (error) {
    // console.error(error)

    session.close()
    driver.close()
    res.sendStatus(503) // Service Unavailable
  }
})

export const RunInNeo4j = router