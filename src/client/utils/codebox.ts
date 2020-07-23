import { toast } from "react-toastify"

import { TextArea } from "./interfaces"
import { initialWhitespace } from "../../server/misc/regex"

const clearCode = (codebox: TextArea, setShow: (arg0: boolean) => void): void => {
  if (codebox.current) {
    codebox.current.value = ""
  }

  toast.dismiss()
  
  setShow(false)
}

const saveToDevice = (codebox: TextArea, filename: string): void => {
  if (codebox.current) {
    const file = new Blob([codebox.current.value], {type: "text/plain"})
    const url = URL.createObjectURL(file)
  
    const a = document.createElement("a")
    a.style.display = "none"
    document.body.appendChild(a)
  
    a.href = url
    a.download = filename
    a.click()
  }
}

const setupAutoComplete= (codebox: TextArea): void => {
  if (codebox.current) {
    codebox.current.addEventListener("keydown", (e) => {
      if (codebox.current) {
        const { keyCode } = e
        const { value, selectionStart, selectionEnd } = codebox.current
      
        // console.log(`Key code: ${keyCode}`)

        const fromBeginningUpToCursor: string = value.substr(0, selectionStart)
        const newLine: number = fromBeginningUpToCursor.lastIndexOf("\n") ?? 0
        const currentLine: string = value.substr(newLine+1, selectionEnd) // Calculated before last key press
        const indentation: string = currentLine.match(initialWhitespace)?.[0] ?? ""
        // console.log(currentLine)
      
        if (keyCode === 9) {  // TAB
          e.preventDefault()
      
          codebox.current.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd)
      
          codebox.current.setSelectionRange(selectionStart+2, selectionStart+2)
        }
      
        if (keyCode === 219) {  // "{" or "["
          let closingCharacter = "}"
          if (e.key == "[") {
            closingCharacter = "]"
          }

          codebox.current.value = value.slice(0, selectionStart) + closingCharacter + value.slice(selectionEnd)
          codebox.current.setSelectionRange(selectionStart, selectionStart)
        }
      
        if (keyCode === 13 && selectionStart !== value.length) {  // ENTER
          e.preventDefault()

          if (value[selectionStart-1] === "{" && value[selectionStart] === "}") {
            codebox.current.value = value.slice(0, selectionStart) + "\n" + indentation + "  " + "\n" + indentation + value.slice(selectionEnd)
            codebox.current.setSelectionRange(selectionStart+indentation.length+3, selectionStart+indentation.length+3)
      
          } else if (value[selectionStart-1] === "{") {  // new line + indentation
            codebox.current.value = value.slice(0, selectionStart) + "\n" + indentation + "  " + value.slice(selectionEnd)
            codebox.current.setSelectionRange(selectionStart+indentation.length+3, selectionStart+indentation.length+3)
            
          } else { // Maintain same indentation level
            codebox.current.value = value.slice(0, selectionStart) + "\n" + indentation + value.slice(selectionEnd)
            codebox.current.setSelectionRange(selectionStart+indentation.length+1, selectionStart+indentation.length+1)
          }
          
        }
      
        if (keyCode === 57) {   // "("
          codebox.current.value = value.slice(0, selectionStart) + ",)" + value.slice(selectionEnd)
          codebox.current.setSelectionRange(selectionStart, selectionStart)
        }
      
        if (keyCode === 188 && value.slice(selectionStart, selectionStart+1) === ",") {   // ","
          e.preventDefault()
          codebox.current.setSelectionRange(selectionStart+1, selectionStart+1)
        }
      }
    })
  }
}

export { clearCode, saveToDevice, setupAutoComplete }
