import neo4j from "neo4j-driver"

// const { DB_HOST, DB_USER, DB_PASS } = process.env

const DB_HOST = "bolt://localhost:7687"
const DB_USER = "neo4j"
const DB_PASS = "telmo"

const driver = neo4j.driver(
  DB_HOST as string,
  neo4j.auth.basic(
    DB_USER as string,
    DB_PASS as string
  )
)

export { driver }
