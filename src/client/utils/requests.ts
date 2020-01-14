import axios from "axios"
import { RefObject } from "react"

const submitCode = async (codebox: RefObject<any>,
  setShow: (boolean) => void, setContent: (string) => void) => {
  
  const res = await axios.post("/er-code", {
    codebox: codebox.current.value,
  })

  setContent(res)
  setShow(true)
}

export { submitCode }
