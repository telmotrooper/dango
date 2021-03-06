import React, { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"

import { testDatabaseConnection } from "../utils/requests"
import { refreshNeo4jDriver, driver } from "../utils/neo4j"
import { defaultToast } from "../utils/toasts"
import { toggleDatabaseConnectionModal } from "../store/modalSlice"
import { RootState } from "../store/store"

interface Props {
  setDatabaseReady: (arg0: boolean) => void;
}

export const DatabaseConnectionModal = React.memo((props: Props) => {
  const { setDatabaseReady } = props
  const dispatch = useDispatch()
  const show = useSelector((state: RootState) => state.modal.showDatabaseConnectionModal)


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

    try {
      await testDatabaseConnection()
      setDatabaseReady(driver != null)
      toast.success("Successfully connected to local Neo4j instance.", defaultToast)
      dispatch(toggleDatabaseConnectionModal())
      
    } catch (err) {
      if (err.message.substr(0, 9) == "WebSocket") {
        setError("WebSocket connection failure. Are you sure the local database is running?")

      } else if (err.message.substr(87, 8) == "Triggers") {
        setError(err.message.substr(87)) // Only display the relevant part of the error message.

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
          <button className="delete" aria-label="close" onClick={() => dispatch(toggleDatabaseConnectionModal())} />
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
              <button className="button" onClick={() => dispatch(toggleDatabaseConnectionModal())}>Cancel</button>
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
