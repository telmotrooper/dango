import React, { useState } from "react"
import { testDatabaseConnection } from "../utils/requests"
import { QueryResult } from "neo4j-driver"
import { refreshNeo4jDriver, driver } from "../utils/neo4j"

interface Props {
  show: boolean;
  setShow: (arg0: boolean) => void;
  setDatabaseReady: (arg0: boolean) => void;
}

export const DatabaseConnectionModal = React.memo((props: Props) => {
  const { show, setShow, setDatabaseReady } = props

  const [ form, setForm ] = useState({
    host: "localhost",
    port: "7687",
    username: "neo4j",
    password: ""
  })

  const [ error, setError ] = useState("")

  const handleSubmit = async (): Promise<void> => {
    localStorage.setItem("connection", JSON.stringify(form))
    refreshNeo4jDriver()

    let res = null
    try {
      res = await testDatabaseConnection()
      console.log(res)
      setDatabaseReady(driver != null)
      setShow(false)
    } catch(err) {
      if(err.message.substring(0, 9) == "WebSocket") {
        setError("WebSocket connection failure. Are you sure the local database is running?")
      } else {
        setError(err.message)
      }
    }
  }

  return (
    <div className={"modal" + (show ? " is-active": "")} id="help-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><b>Setup local database connection</b></p>
          <button className="delete" aria-label="close" onClick={(): void => setShow(false)} />
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Host:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="host"
                  value={form.host}
                  onChange={(event): void => setForm({ ...form, host: event.target.value})}
                  />
              </div>
            </div>

            <div className="field">
              <label className="label">Port:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="port"
                  value={form.port}
                  onChange={(event): void => setForm({ ...form, port: event.target.value})}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Username:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={(event): void => setForm({ ...form, username: event.target.value})}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password:</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={(event): void => setForm({ ...form, password: event.target.value})}
                />
              </div>
            </div>
            <p><span className="has-text-weight-bold">Note:</span> The data you input here will be saved in your browser's local storage.</p>
            {error && <p className="has-text-danger"><span className="has-text-weight-bold">Error:</span> {error}</p>}
          </form>
        </section>
        <footer className="modal-card-foot jc-flex-end">
          <div className="field is-grouped">
            <div className="control">
              <button className="button" onClick={(): void => setShow(false)}>Cancel</button>
            </div>
            <div className="control">
              <button className="button is-success" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
})
