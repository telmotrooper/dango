import axios, { AxiosResponse } from "axios"
import { driver } from "./neo4j"
import { QueryResult } from "neo4j-driver"
import { toast } from "react-toastify"
import { defaultToast } from "./toasts"

export const submitCode = (code: string): Promise<AxiosResponse> =>
  axios.post("/api/er-to-json", {
    codebox: code,
  })

export const getCypherFromER = (code: string, strictMode: boolean): Promise<AxiosResponse> =>
  axios.post("/api/json-to-cypher", {
    er: code,
    strictMode
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
    for (const record of constraints.records) { // Run statements sequentially.
      await session.run(`DROP ${record.get('description')}`)
    }

    await session.close()
  
    toast.info("Previous constraints and triggers removed from the database.", defaultToast)

    return removeAllTriggers
  }
  throw "Method called without a valid driver."
}

export const runStatements = async (statements: Array<string>): Promise<void> => {
  if (driver) {
    const session = driver.session()

    for (const statement of statements) { // Run statements sequentially.
      await session.run(statement)
    }

    await session.close()

    return
  }
  throw "Method called without a valid driver."
}
