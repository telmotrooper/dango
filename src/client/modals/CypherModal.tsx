import React, { createRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { toggleCypherModal, toggleDatabaseConnectionModal } from "../store/modalSlice"
import { RootState } from "../store/store"
import { saveToDevice } from "../utils/codebox"
import { cleanUpDatabase, runStatements } from "../utils/requests"
import { defaultToast } from "../utils/toasts"

interface Props {
  databaseReady: boolean;
}

const CypherModal = React.memo((props: Props) => {
  const { databaseReady } = props

  const dispatch = useDispatch()
  const show = useSelector((state: RootState) => state.modal.showCypherModal)
  const content = useSelector((state: RootState) => state.modal.cypherContent)

  const textAreaRef = createRef<HTMLTextAreaElement>()

  const executeCypher = async (): Promise<void> => {
    try {
      await cleanUpDatabase()

      const statements = textAreaRef.current?.value?.replace(/\n/g, "")
        .split(";")
        .filter(text => text != "") ?? []
      // console.log(statements)

      await runStatements(statements)

      toast.success("Cypher statements executed.", defaultToast)

    } catch (err) {
      // ALL NEO4J ERRORS APPLY HERE, MAYBE I SHOULD STANDARDIZE ERROR HANDLING?
      console.error(err)
    }
  }

  return (
    <div className={"modal" + (show ? " is-active": "")} id="cypher-modal">
      <div className="modal-card modal-card-big">
        <header className="modal-card-head">
          <p className="modal-card-title">
            <b>Converter output</b> <i>(Cypher)</i>
          </p>
          <button className="delete" aria-label="close" onClick={() => dispatch(toggleCypherModal())} />
        </header>
        <section className="modal-card-body">
          <p className="mb-05 ta-j">
            This is a schema for the Neo4j graph database (written in the
            Cypher query language) based on your Enhanced Entity-Relationship diagram:
          </p>
          <textarea ref={textAreaRef} readOnly={true} value={content}
            className="textarea has-fixed-size is-small mb-1" rows={22} id="json-to-cypher" />
          <p className="ta-j">
            If you have a local Neo4j instance running, you can run these queries straight from this page.
          </p>
        </section>
        <footer className="modal-card-foot jc-space-between">
          <button className="button"
            onClick={(): void => saveToDevice(textAreaRef, "cypher.txt")}>Save to device</button>
          
          <div>
            {/* <button className="button is-info">
              Generate visualization
            </button> */}
            <button className={"button" + (!databaseReady ? " is-success": "")} onClick={() => dispatch(toggleDatabaseConnectionModal())}>
              Setup database connection
            </button>
            {(databaseReady &&
            <button className="button is-success" onClick={executeCypher}>
              Execute
            </button>)}
          </div>
        </footer>
      </div>
    </div>
  )
})

export { CypherModal }
