import axios from "axios"
import { RefObject } from "react"

const submitCode = async (textArea: RefObject<any>,
  setShow: (boolean) => void, setContent: (string) => void) => {
  
  const res = await axios.post("/er-code", {
    codebox: textArea.current.value,
  })

  setContent(res.data)
  setShow(true)
}

const getCypherFromER = async (textArea: RefObject<any>,
  setShow: (boolean) => void, setContent: (string) => void) => {
  
  const res = await axios.post("/get-cypher-from-er", {
    er: textArea.current.value,
  })

  setContent(res.data)
  setShow(true)
}

export { getCypherFromER, submitCode }
