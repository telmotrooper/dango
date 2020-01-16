import axios, { AxiosResponse } from "axios"
import { RefObject } from "react"

const submitCode = (code: string): Promise<AxiosResponse> =>
  axios.post("/er-code", {
    codebox: code,
  })


// const submitCode = async (textArea: RefObject<unknown>) => {
//   try {
//     const res = await axios.post("/er-code", {
//       codebox: textArea.current.value,
//     })

//     store.dispatch(submitCodeSuccess(res.data))
//   } catch (err) {
//     store.dispatch(submitCodeError(err.message))
//   }

//   // setContent(res.data)
//   // setShow(true)
// }

// const submitCode = async (textArea: RefObject<any>,
//   setShow: (boolean) => void, setContent: (string) => void) => {
  
//   const res = await axios.post("/er-code", {
//     codebox: textArea.current.value,
//   })

//   setContent(res.data)
//   setShow(true)
// }

const getCypherFromER = async (textArea: RefObject<any>,
  setShow: (boolean) => void, setContent: (string) => void) => {
  
  const res = await axios.post("/get-cypher-from-er", {
    er: textArea.current.value,
  })

  setContent(res.data)
  setShow(true)
}

export { getCypherFromER, submitCode }
