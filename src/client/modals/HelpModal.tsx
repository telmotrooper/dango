import React from "react"
import { MemoryRouter, Switch, Route } from "react-router-dom";

import { Home } from "./help/Home";
import { SelfRelationship } from "./help/SelfRelationship";
import { HelpWrapper } from "./help/HelpWrapper";

interface Props {
  show: boolean;
  setShow: (arg0: boolean) => void;
}

const HelpModal = React.memo((props: Props) => {
  const { show, setShow } = props

  return (
    <div className={"modal" + (show ? " is-active": "")} id="help-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><b>Help</b></p>
          <button className="delete" aria-label="close" onClick={(): void => setShow(!show)} />
        </header>
        <section className="modal-card-body">
          <MemoryRouter>
            <Switch>
              <Route exact path="/" component={() => Home()} />
              <Route path="/self-relationship" component={() => HelpWrapper(SelfRelationship())} />
            </Switch>
          </MemoryRouter>
        </section>
        <footer className="modal-card-foot jc-flex-end">
          <button className="button" onClick={(): void => setShow(!show)}>
            OK
          </button>
        </footer>
      </div>
    </div>
  )
})

export { HelpModal }
