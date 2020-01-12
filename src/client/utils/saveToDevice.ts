import { RefObject } from "react"

const saveToDevice = (codebox: RefObject<any>) => {
  const file = new Blob([codebox.current.value], {type: "text/plain"})
  const url = URL.createObjectURL(file)

  let a = document.createElement("a")
  a.style.display = "none"
  document.body.appendChild(a)

  a.href = url
  a.download = "er.txt"
  a.click()
}

export { saveToDevice }
