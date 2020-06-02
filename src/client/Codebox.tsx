import React, { ChangeEvent, useState, useEffect } from "react"
import { TextArea } from "./utils/interfaces"
import { useDebounce } from "./utils/useDebounce"
import { submitCode } from "./utils/requests"
import { convertER } from "./utils/graphviz"
import { Engine } from "d3-graphviz"

interface Props {
  textAreaRef: TextArea;
  handleSubmit: () => Promise<void>;
  handleUpdate: (diagram: string) => void;
  setEngine: (engine: Engine) => void;
  engine: Engine;
}

const Codebox = React.memo((props: Props) => {
  const { textAreaRef, handleSubmit, handleUpdate, setEngine, engine } = props

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
      <button className="button is-primary is-fullwidth mb-05" onClick={handleSubmit}>
        Send
      </button>
      <div className="field flex-aic">
        <label className="label mb-0">Rendering engine:</label>
        <div className="select">
          <select
            onChange={(event: ChangeEvent<HTMLSelectElement>): void => {
              setEngine(event.target.value as Engine)
            }}
            defaultValue={engine}
          >
            <option>circo</option>
            <option>dot</option>
            <option>fdp</option>
            <option>neato</option>
            {/* <option>osage</option>
            <option>patchwork</option> */}
            <option>twopi</option>
          </select>
        </div>
      </div>
    </section>
  )
})

export { Codebox }
