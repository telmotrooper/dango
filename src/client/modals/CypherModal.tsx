import React, { createRef } from "react"
import { saveToDevice } from "../utils/codebox"
import { testDatabaseConnection } from "../utils/requests"
import { QueryResult } from "neo4j-driver"

interface Props {
  show: boolean;
  setShow: (arg0: boolean) => void;
  content: string;
  onSubmit: () => void;
}

const CypherModal = React.memo((props: Props) => {
  const { content, show, setShow, onSubmit } = props

  const handleTestDatabaseConnection = async (): Promise<QueryResult> => {
    const res = await testDatabaseConnection()
    console.log(res)
    return res
  }

  const textAreaRef = createRef<HTMLTextAreaElement>()

  return (
    <div className={"modal" + (show ? " is-active": "")} id="cypher-modal">
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            <b>Converter output</b> <i>(Cypher)</i>
          </p>
          <button className="delete" aria-label="close" onClick={(): void => setShow(false)} />
        </header>
        <section className="modal-card-body">
          <p className="mb-05 ta-j">
            This is a schema for the Neo4j graph database (written in the
            Cypher query language) based on your Entity-Relationship Diagram:
          </p>
          <textarea ref={textAreaRef} readOnly={true} value={content}
            className="textarea has-fixed-size is-small mb-1" rows={18} id="get-cypher-from-er" />
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
            <button className="button is-success" onClick={onSubmit}>
              Setup database connection
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
})

export { CypherModal }
