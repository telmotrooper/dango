import axios, { AxiosResponse } from "axios"
import { RefObject } from "react"

const submitCode = (code: string): Promise<AxiosResponse> =>
  axios.post("/er-code", {
    codebox: code,
  })

const getCypherFromER = (code: string): Promise<AxiosResponse> =>
  axios.post("/get-cypher-from-er", {
    er: code,
  })

// const getCypherFromER = async (textArea: RefObject<any>,
//   setShow: (boolean) => void, setContent: (string) => void) => {
  
//   const res = await axios.post("/get-cypher-from-er", {
//     er: textArea.current.value,
//   })

//   setContent(res.data)
//   setShow(true)
// }

export { getCypherFromER, submitCode }
