import React, { ChangeEvent, useState, useEffect } from "react"
import { Engine } from "d3-graphviz"
import { toast } from "react-toastify"

import { TextArea } from "./utils/interfaces"
import { useDebounce } from "./utils/useDebounce"
import { submitCode } from "./utils/requests"
import { convertER } from "./utils/graphviz"
import { example } from "./utils/example"

interface Props {
  textAreaRef: TextArea;
  handleSubmit: () => Promise<void>;
  handleUpdate: (diagram: string) => void;
  setEngine: (engine: Engine) => void;
  sendButtonDisabled: boolean;
  setSendButtonDisabled: (disabled: boolean) => void;
  engine: Engine;
}

const Codebox = React.memo((props: Props) => {
  const { textAreaRef, handleSubmit, handleUpdate, setEngine, engine, sendButtonDisabled, setSendButtonDisabled } = props

  const [ code, setCode ] = useState("")
  const debouncedCode = useDebounce(code, 500)

  useEffect(
    () => {
      async function handleSubmitCode(): Promise<void> {
        if (debouncedCode !== "") {
          const firstWord = code.match(/\w+/)?.[0]

          if (firstWord == "graph" || firstWord == "digraph") { // Allows testing Graphviz input straight from the application.
            handleUpdate(code)

          } else {
            const res = await submitCode(debouncedCode)

            if(res.data?.warning) {
              setSendButtonDisabled(true)
              toast(res.data.warning)
            } else {
              setSendButtonDisabled(false)
              toast.dismiss()
            }

            // Convert ER to Graphviz and update diagram
            handleUpdate(convertER(res.data))
          }
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
      <button className="button is-primary is-fullwidth mb-05" onClick={handleSubmit} disabled={sendButtonDisabled}>
        Send
      </button>
      <div className="columns">
        <div className="column">
          <button className="button is-fullwidth mb-05" onClick={(): void => {
            if (textAreaRef?.current) {
              textAreaRef.current.value = example
              setCode(example)
            }
          }}>
            Load example
          </button>
        </div>
        <div className="column">
          <div className="field flex-aic-jcsb">
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
        </div>
      </div>
    </section>
  )
})

export { Codebox }
