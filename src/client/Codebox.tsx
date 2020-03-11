import React, { ChangeEvent, useState, useEffect } from "react"
import { TextArea } from "./utils/interfaces"
import { useDebounce } from "./utils/useDebounce"
import { submitCode } from "./utils/requests"
import { convertER } from "./utils/graphviz"

interface Props {
  textAreaRef: TextArea;
  handleSubmit: () => Promise<void>;
  handleUpdate: (diagram: string) => void;
}

const Codebox = React.memo((props: Props) => {
  const { textAreaRef, handleSubmit, handleUpdate } = props

  const [ code, setCode ] = useState("")
  const debouncedCode = useDebounce(code, 500)

  useEffect(
    () => {
      async function handleSubmitCode(): Promise<void> {
        if (debouncedCode !== "") {
          const res = await submitCode(debouncedCode)

          // Convert ER to Graphviz and update diagram
          handleUpdate(convertER(res.data))
        }
      }

      handleSubmitCode()
    }
  , [debouncedCode])

  return (
    <section id="form" className="column is-one-third">
      <textarea
        name="codebox"
        ref={textAreaRef}
        className="textarea has-fixed-size is-small mb-1"
        rows={25}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
          setCode(event.target.value)
        }}
      />
      <button className="button is-primary is-fullwidth" onClick={handleSubmit}>
        Send
      </button>
    </section>
  )
})

export { Codebox }