import neo4j, { Driver } from "neo4j-driver"

// The Neo4j Driver from which we'll open our database sessions.
let driver: Driver | null = null

// If connection data from local storage has been updated, refresh Neo4j driver.
export const refreshNeo4jDriver = (): void => {
  if (localStorage.getItem("connection")) {
    const conn = JSON.parse(localStorage.getItem("connection") as string)

    driver = neo4j.driver(
      `bolt://${conn.host}:${conn.port}`,
      neo4j.auth.basic(
        conn.username,
        conn.password
      )
    )
  }
}

export { driver }
