import axios from "axios"
import { RefObject } from "react"

const submitCode = (codebox: RefObject<any>) => {
  axios.post("/er-code", {
    codebox: codebox.current.value
  }).then((res) => {
    console.log("Done")
  })

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
