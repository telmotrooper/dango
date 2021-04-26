import React, { createRef, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Graphviz } from "graphviz-react"
import { Engine } from "d3-graphviz"
import { ToastContainer } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import "bulma/css/bulma.css"

import { HelpModal } from "./modals/help/HelpModal"
import { ClearModal } from "./modals/ClearModal"
import { Header } from "./Header"
import { saveToDevice, setupAutoComplete } from "./utils/codebox"
import { submitCode, getCypherFromER } from "./utils/requests"
import { ParserModal } from "./modals/ParserModal"
import { TextArea, Input } from "./utils/interfaces"
import { CypherModal } from "./modals/CypherModal"
import { Codebox } from "./Codebox"
import { DatabaseConnectionModal } from "./modals/DatabaseConnectionModal"
import { refreshNeo4jDriver, driver } from "./utils/neo4j"
import { ErrorBoundary } from "./ErrorBoundary"
import { Button } from "./layout/Button"
import { Section } from "./layout/Section"
import { Provider, useDispatch, useSelector } from "react-redux"
import { RootState, store } from "./store/store"
import { setParserContent, toggleClearModal, toggleCypherModal, toggleHelpModal, toggleParserModal } from "./store/modalSlice"
import { MainContext } from "./store/context"
import { incrementErrorBoundaryKey } from "./store/generalSlice"

const App = (): JSX.Element => {
  const textAreaRef = createRef<HTMLTextAreaElement>()

  const errorBoundaryKey = useSelector((state: RootState) => state.general.errorBoundaryKey)

  const dispatch = useDispatch()

  // Main application state
  const [ sendButtonDisabled, setSendButtonDisabled ] = useState(true)
  const [ cypherContent,   setCypherContent ] = useState("")
  const [ diagram, _setDiagram ] = useState("")
  const [ databaseReady, setDatabaseReady ] = useState(false)
  const [ engine, setEngine ] = useState<Engine>("dot")
  const [ code, _setCode ] = useState("")

  // Check if we have connection data in local storage to prepare Neo4j driver.
  useEffect(() => {
    if (localStorage.getItem("connection")) {
      refreshNeo4jDriver()
      setDatabaseReady(driver != null)
    }
  }, [])

  const setCode = (text: string): void => {
    _setCode(text) // Update state

    if (textAreaRef?.current) { // Update text area
      textAreaRef.current.value = text
    }
  }

  const setDiagram = (text: string): void => {
    _setDiagram(text)
    dispatch(incrementErrorBoundaryKey()) // This allows us to reattempt to render after a Graphviz error.
  }

  // Enable auto complete only when codebox already exists in the DOM 
  useEffect(() => setupAutoComplete(textAreaRef))

  const handleSubmitCode = (ref: TextArea) => async (): Promise<void> => {
    if (ref.current) {
      const res = await submitCode(ref.current.value)
      dispatch(setParserContent(res.data))
      dispatch(toggleParserModal())
    }
  }

  const handleGetCypherFromER = (textArea: TextArea, checkbox: Input) => async (): Promise<void> => {
    if (textArea.current && checkbox.current) {
      const res = await getCypherFromER(textArea.current.value, checkbox.current.checked)
      setCypherContent(res.data)
      dispatch(toggleCypherModal())
    }
  }

  return (
    <MainContext.Provider value={{ textAreaRef: textAreaRef }}>
      <Section>
        <div className="container is-fluid">
          <ToastContainer
            position="top-right"
            autoClose={false}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={true}
            draggable={false}
            pauseOnHover={false}
            closeButton={false}
            style={{width: "500px"}}
          />

          <Header />
      
          <section id="top-menu" className="columns">
            <div className="column">
              <Button className="is-fullwidth" onClick={() => dispatch(toggleClearModal())}>
                Clear
              </Button>
            </div>
            <div className="column">
              <Button className="is-fullwidth" onClick={(): void => saveToDevice(textAreaRef, "er.txt")}>
                Save to device
              </Button>
            </div>
          </section>

          <p className="mb-05 fs-09 mt-minus-05">
            We've made a simple notation to represent EER diagrams in human-readable code!
            Learn more <a onClick={() => dispatch(toggleHelpModal())}>here</a>.
          </p>

          <div className="columns">
            <Codebox
              code={code}
              setCode={setCode}
              handleSubmit={handleSubmitCode(textAreaRef)}
              handleUpdate={setDiagram}
              engine={engine}
              setEngine={setEngine}
              sendButtonDisabled={sendButtonDisabled}
              setSendButtonDisabled={setSendButtonDisabled}
            />
            <section id="vis" className="column vis">
              <ErrorBoundary key={errorBoundaryKey}>
                <Graphviz
                  options={{
                    engine,
                    zoom: true,
                    height: "100%" as unknown as number,
                    width: "100%" as unknown as number
                  }}
                  dot={diagram || "graph G {}"}
                />
              </ErrorBoundary>
            </section>
          </div>
        </div>
      </Section>

      <HelpModal setCode={setCode} />

      <ParserModal onSubmit={handleGetCypherFromER} />

      <CypherModal content={cypherContent} databaseReady={databaseReady} />

      <ClearModal
        setDiagram={(text: string) => setDiagram(text)}
        setSendButtonDisabled={setSendButtonDisabled}
      />

      <DatabaseConnectionModal setDatabaseReady={setDatabaseReady} />
    </MainContext.Provider>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
)
