import axios from "axios"
import { RefObject } from "react"

const submitCode = async (codebox: RefObject<any>, setShow: (boolean) => void) => {
  const res = await axios.post("/er-code", {
    codebox: codebox.current.value,
  })

  console.log("Done")
  setShow(true)

  // xhr.open("POST", "/er-code");
  // xhr.setRequestHeader("Content-Type", "application/json");

  // xhr.send(JSON.stringify(data));

  // xhr.onreadystatechange = () => {
  //   if(xhr.readyState === 4 && xhr.status === 200) {
  //     openParserModal(xhr.responseText)
  //   }
  // }
}

export { submitCode }
