import axios, { AxiosResponse } from "axios"
import { driver } from "./neo4j"
import { QueryResult } from "neo4j-driver"

export const submitCode = (code: string): Promise<AxiosResponse> =>
  axios.post("/api/er-code", {
    codebox: code,
  })

export const getCypherFromER = (code: string): Promise<AxiosResponse> =>
  axios.post("/api/get-cypher-from-er", {
    er: code,
  })

export const testDatabaseConnection = async (): Promise<QueryResult> => {
  if (driver) {
    const session = driver.session()

    const result = await session.run("CALL apoc.trigger.list();")
    await session.close()
  
    return result
  }
  throw "Method called without a valid driver."
}

export const cleanUpDatabase = async (): Promise<QueryResult> => {
  if (driver) {
    const session = driver.session()

    const removeAllTriggers: QueryResult = await session.run("CALL apoc.trigger.removeAll();")

    const constraints: QueryResult = await session.run("CALL db.constraints();")

    // Drop all constraints.
    await Promise.all(
      constraints.records.map(record => session.run(`DROP ${record.get('description')}`))
    )

    await session.close()
  
    return removeAllTriggers
  }
  throw "Method called without a valid driver."
}

export const runStatements = async (statements: Array<string>): Promise<void> => {
  if (driver) {
    const session = driver.session()

    await Promise.all(
      statements.map(statement => session.run(statement))
    )

    await session.close()
  }
  throw "Method called without a valid driver."
}
