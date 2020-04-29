import neo4j from "neo4j-driver"

const { DB_HOST, DB_USER, DB_PASS } = process.env

// Global Neo4j driver instance, used whenever we need to get a session to access the database
const driver = neo4j.driver(
  DB_HOST as string,
  neo4j.auth.basic(
    DB_USER as string,
    DB_PASS as string
  )
)

/* Good practices dictate we should close the Neo4j driver when exiting the application,
 * but it doesn't seem to be working well (the process hangs on exit). So for now, we're
 * not doing it. The sessions though should be properly closed after used. */

// const closeDriver = (): void => {
//   console.log("Neo4j driver instance shutting down")
//   driver.close()
// }

// process.on("SIGINT", closeDriver)
// process.on("SIGTERM", closeDriver)

export { driver }
