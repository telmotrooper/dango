import { RefObject } from "react"

const saveToDevice = (codebox: RefObject<any>): void => {
  const file = new Blob([codebox.current.value], {type: "text/plain"})
  const url = URL.createObjectURL(file)

  const a = document.createElement("a")
  a.style.display = "none"
  document.body.appendChild(a)

  a.href = url
  a.download = "er.txt"
  a.click()
}

const clearCode = (codebox: RefObject<any>, setShow: (boolean) => void) => {
  codebox.current.value = ""
  setShow(false)
}

export { clearCode, saveToDevice }
