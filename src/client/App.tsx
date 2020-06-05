import React, { createRef, Fragment, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { HelpModal } from "./modals/HelpModal"
import { ClearModal } from "./modals/ClearModal"
import { Header } from "./Header"
import { saveToDevice, setupAutoComplete } from "./utils/codebox"
import { submitCode, getCypherFromER } from "./utils/requests"
import { ParserModal } from "./modals/ParserModal"
import { GenericObject, TextArea } from "./utils/interfaces"
import { CypherModal } from "./modals/CypherModal"
import { Graphviz } from "graphviz-react"
import { Codebox } from "./Codebox"
import { DatabaseConnectionModal } from "./modals/DatabaseConnectionModal"
import { refreshNeo4jDriver, driver } from "./utils/neo4j"
import { Engine } from "d3-graphviz"

const App = (): JSX.Element => {
  const [ showClearModal , setShowClearModal  ] = useState(false)
  const [ showHelpModal  , setShowHelpModal   ] = useState(false)
  const [ showParserModal, setShowParserModal ] = useState(false)
  const [ showCypherModal, setShowCypherModal ] = useState(false)
  const [ showDatabaseConnectionModal, setShowDatabaseConnectionModal ] = useState(false)
  const [ parserContent,   _setParserContent ] = useState("")
  const [ cypherContent,   setCypherContent ] = useState("")
  const [ diagram, setDiagram ] = useState("")
  const [ databaseReady, setDatabaseReady ] = useState(false)
  const [ engine, setEngine ] = useState<Engine>("dot")

  // Check if we have connection data in local storage to prepare Neo4j driver.
  useEffect(() => {
    if (localStorage.getItem("connection")) {
      refreshNeo4jDriver()
      setDatabaseReady(driver != null)
    }
  }, [])

  const setParserContent = (json: GenericObject): void => {
    const text = JSON.stringify(json, null, 2)
    _setParserContent(text)
  }

  const textAreaRef = createRef<HTMLTextAreaElement>()

  // Enable auto complete only when codebox already exists in the DOM 
  useEffect(() => setupAutoComplete(textAreaRef))

  const handleSubmitCode = (ref: TextArea) => async (): Promise<void> => {
    if (ref.current) {
      const res = await submitCode(ref.current.value)
      setParserContent(res.data)
      setShowParserModal(true)
    }
  }

  const handleGetCypherFromER = (ref: TextArea) => async (): Promise<void> => {
    if (ref.current) {
      const res = await getCypherFromER(ref.current.value)
      setCypherContent(res.data)
      setShowCypherModal(true)
    }
  }

  return (
    <Fragment>
      <section className="section">
        <div className="container is-fluid">

          {/* <div className="notification is-warning floating notification-pos">
            <button className="delete"></button>
            Unable to reach server...
          </div> */}

          <Header />
      
          <section id="top-menu" className="columns">
            <div className="column">
              <button className="button is-fullwidth" onClick={(): void => setShowClearModal(!showClearModal)}>
                Clear
              </button>
            </div>
            <div className="column">
              <button className="button is-fullwidth" onClick={(): void => saveToDevice(textAreaRef, "er.txt")}>
                Save to device
              </button> 
            </div>
          </section>

          <p className="mb-05 fs-09 mt-minus-05">
            We've made a simple notation to represent ER diagrams in human-readable code!
            Learn more <a onClick={(): void => setShowHelpModal(!showHelpModal)}>here</a>.
          </p>

          <div className="columns">
            <Codebox
              textAreaRef={textAreaRef}
              handleSubmit={handleSubmitCode(textAreaRef)}
              handleUpdate={setDiagram}
              engine={engine}
              setEngine={setEngine}
            />
            <section id="vis" className="column vis">
              <Graphviz
                options={{
                  engine,
                  zoom: true,
                  height: ("100%" as unknown as number),
                  width: ("100%" as unknown as number)
                }}
                dot={diagram || `graph G {}`}
              />
            </section>
          </div>
        </div>
      </section>

      <HelpModal
        show={showHelpModal}
        setShow={(): void => setShowHelpModal(!showHelpModal)}
      />

      <ParserModal
        content={parserContent}
        show={showParserModal}
        setShow={(): void => setShowParserModal(!showParserModal)}
        onSubmit={handleGetCypherFromER}
      />

      <CypherModal
        content={cypherContent}
        show={showCypherModal}
        setShow={(): void => setShowCypherModal(!showCypherModal)}
        onSubmit={(): void => setShowDatabaseConnectionModal(!showDatabaseConnectionModal)}
        databaseReady={databaseReady}
      />

      <ClearModal
        checkbox={textAreaRef}
        show={showClearModal}
        setShow={(): void => setShowClearModal(!showClearModal)}
      />

      <DatabaseConnectionModal
        show={showDatabaseConnectionModal}
        setShow={(): void => setShowDatabaseConnectionModal(!showDatabaseConnectionModal)}
        setDatabaseReady={setDatabaseReady}
      />
    </Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
