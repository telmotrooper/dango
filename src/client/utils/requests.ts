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
