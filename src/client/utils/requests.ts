import axios, { AxiosResponse } from "axios"

const submitCode = (code: string): Promise<AxiosResponse> =>
  axios.post("/er-code", {
    codebox: code,
  })

const getCypherFromER = (code: string): Promise<AxiosResponse> =>
  axios.post("/get-cypher-from-er", {
    er: code,
  })

export { getCypherFromER, submitCode }
