import neo4j from "neo4j-driver"

// Default values for database connection.
let conn = { host: "", port: 0, username: "", password: "" }

// Replace connection data with data from local storage, if it exists.
if (localStorage.getItem("connection")) {
  conn = JSON.parse(localStorage.getItem("connection") as string)
}

let driver = neo4j.driver(
  `bolt://${conn.host}:${conn.port}`,
  neo4j.auth.basic(
    conn.username,
    conn.password
  )
)

// If connection data from local storage has been updated, refresh Neo4j driver.
export const refreshNeo4jDriver = (): void => {
  if (localStorage.getItem("connection")) {
    conn = JSON.parse(localStorage.getItem("connection") as string)
  }

  driver = neo4j.driver(
    `bolt://${conn.host}:${conn.port}`,
    neo4j.auth.basic(
      conn.username,
      conn.password
    )
  )
}

export { driver }
