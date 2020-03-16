import { TextArea } from "./interfaces"

const clearCode = (codebox: TextArea, setShow: (arg0: boolean) => void): void => {
  if(codebox.current) {
    codebox.current.value = ""
  }
  
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
  if(codebox.current) {
    codebox.current.addEventListener("keydown", (e) => {
      if(codebox.current) {
        const { keyCode } = e;
        const { value, selectionStart, selectionEnd } = codebox.current;
      
        // console.log(`Key code: ${keyCode}`)
      
        if (keyCode === 9) {  // TAB
          e.preventDefault();
      
          codebox.current.value = value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
      
          codebox.current.setSelectionRange(selectionStart+2, selectionStart+2)
        }
      
        if (keyCode === 219) {  // "{"
          codebox.current.value = value.slice(0, selectionStart) + "}" + value.slice(selectionEnd);
          codebox.current.setSelectionRange(selectionStart, selectionStart)
        }
      
        if (keyCode === 13 && selectionStart !== value.length) {  // ENTER
          /* Using "value" instead of "codebox.value", because value
              is a copy of the codebox value at the beginning of the
              event, which allows us compare it to "selectionStart"
              to know when the cursor is at the end of the codebox. */
      
          if(value[selectionStart-1] === "{" && value[selectionStart] === "}") {
            e.preventDefault();
      
            codebox.current.value = value.slice(0, selectionStart) + "\n  \n" + value.slice(selectionEnd);
            codebox.current.setSelectionRange(selectionStart+3, selectionStart+3)
      
          } else if(value[selectionStart-1] === "{" || value[selectionStart+1] === "}") {  // new line + two spaces indentation
            e.preventDefault();
      
            codebox.current.value = value.slice(0, selectionStart) + "\n  " + value.slice(selectionEnd);
            codebox.current.setSelectionRange(selectionStart+3, selectionStart+3)
          }
          
        }
      
        if (keyCode === 57) {   // "("
          codebox.current.value = value.slice(0, selectionStart) + ",)" + value.slice(selectionEnd);
          codebox.current.setSelectionRange(selectionStart, selectionStart)
        }
      
        if (keyCode === 188 && value.slice(selectionStart, selectionStart+1) === ",") {   // ","
          e.preventDefault();
          codebox.current.setSelectionRange(selectionStart+1, selectionStart+1);
        }
      }
    });
  }
}

export { clearCode, saveToDevice, setupAutoComplete }
