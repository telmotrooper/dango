import { createContext } from "react"
import { TextArea } from "./interfaces"

interface ContextProps {
    textAreaRef: TextArea | null
  }
  
export const MainContext = createContext<ContextProps>({ textAreaRef: null })
