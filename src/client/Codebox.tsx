import React, { ChangeEvent, useContext, useEffect } from "react"
import { Engine } from "d3-graphviz"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"

import { useDebounce } from "./utils/useDebounce"
import { submitCode } from "./utils/requests"
import { erToGraphviz } from "./utils/graphviz"
import { mainExample } from "./utils/erExamples"
import { ER } from "../server/misc/interfaces"
import { MainContext } from "./store/context"
import { RootState } from "./store/store"
import { enableSendButton, setDiagram, setEngine } from "./store/generalSlice"
interface Props {
  code: string,
  setCode: (code: string) => void,
  handleSubmit: () => Promise<void>;
}

const Codebox = React.memo((props: Props) => {
  const { textAreaRef } = useContext(MainContext)

  const dispatch = useDispatch()
  const engine = useSelector((state: RootState) => state.general.engine)
  const sendButtonEnabled = useSelector((state: RootState) => state.general.sendButtonEnabled)


  const { code, setCode, handleSubmit } = props
  const debouncedCode = useDebounce(code, 500)

  useEffect(
    () => {
      async function handleSubmitCode(): Promise<void> {
        if (debouncedCode !== "") {
          const firstWord = code.match(/\w+/)?.[0]

          if (firstWord == "graph" || firstWord == "digraph") { // Allows testing Graphviz input straight from the application.
            dispatch(setDiagram(code))

          } else {
            const res = await submitCode(debouncedCode)

            const er: ER = res.data

            console.log(
              `Entities: ${er.ent.length}\n`
              + `Relationships: ${er.rel.length}\n`
              + `Associative entities: ${er.aent.length}\n`
              + `Specializations: ${er.spe.length}\n`
              + `Unions: ${er.unions.length}\n`
            )

            if (res.data?.warning) {
              toast.dismiss()
              dispatch(enableSendButton(false))
              toast(res.data.warning)
            } else {
              dispatch(enableSendButton(true))
              toast.dismiss()
            }

            // Convert ER to Graphviz and update diagram
            dispatch(setDiagram(erToGraphviz(res.data)))
          }
        }
      }

      handleSubmitCode()
    }
  , [debouncedCode])

  return (
    <section id="main-form" className="column is-one-third">
      <textarea
        name="codebox"
        ref={textAreaRef}
        className="textarea has-fixed-size is-small mb-1"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
          setCode(event.target.value)
        }}
      />
      <button className="button is-primary is-fullwidth mb-05" onClick={handleSubmit} disabled={!sendButtonEnabled}>
        Send
      </button>
      <div className="columns">
        <div className="column">
          <button className="button is-fullwidth mb-05" onClick={(): void => setCode(mainExample)}>
            Load example
          </button>
        </div>
        <div className="column">
          <div className="field flex-aic-jcsb">
            <label className="label mb-0">Rendering engine:</label>
            <div className="select">
              <select
                onChange={(event: ChangeEvent<HTMLSelectElement>) => dispatch(setEngine(event.target.value as Engine))}
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
