import React, { useState } from "react"
import { testDatabaseConnection } from "../utils/requests"
import { QueryResult } from "neo4j-driver"

interface Props {
  show: boolean;
  setShow: (arg0: boolean) => void;
}

export const DatabaseConnectionModal = React.memo((props: Props) => {
  const { show, setShow } = props

  const [ state, setState ] = useState({
    host: "localhost",
    port: "7687",
    username: "neo4j",
    password: ""
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<QueryResult> => {
    event.preventDefault();

    alert("Submitted.");
    
    const res = await testDatabaseConnection()
    console.log(res)
    return res
  }

  return (
    <div className={"modal" + (show ? " is-active": "")} id="help-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><b>Setup database connection</b></p>
          <button className="delete" aria-label="close" onClick={(): void => setShow(!show)} />
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
                  value={state.host}
                  onChange={(event): void => setState({ ...state, host: event.target.value})}
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
                  value={state.port}
                  onChange={(event): void => setState({ ...state, port: event.target.value})}
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
                  value={state.username}
                  onChange={(event): void => setState({ ...state, username: event.target.value})}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password:</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="password"
                  value={state.password}
                  onChange={(event): void => setState({ ...state, password: event.target.value})}
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot jc-flex-end">
          <div className="field is-grouped">
            <div className="control">
              <button className="button">Cancel</button>
            </div>
            <div className="control">
              <button className="button is-success">Submit</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
})
