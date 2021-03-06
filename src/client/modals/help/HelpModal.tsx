import React from "react"
import { MemoryRouter, Switch, Route } from "react-router-dom"

import { Home } from "./Home"
import { SelfRelationships } from "./SelfRelationships"
import { HelpWrapper } from "./HelpWrapper"
import { Specializations } from "./Specializations"
import { helpRoutes } from "./helpRoutes"
import { Relationships } from "./Relationships"
import { CompositeAttributes } from "./CompositeAttributes"
import { MultivaluedAttributes } from "./MultivaluedAttributes"
import { AssociativeEntities } from "./AssociativeEntities"
import { Unions } from "./Unions"
import { WeakEntities } from "./WeakEntities"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { toggleHelpModal } from "../../store/modalSlice"

interface Props {
  setCode: (code: string) => void;
}

const HelpModal = React.memo((props: Props) => {
  const { setCode } = props
  const dispatch = useDispatch()
  const show = useSelector((state: RootState) => state.modal.showHelpModal)

  return (
    <div className={"modal" + (show ? " is-active": "")} id="help-modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title"><b>Help</b></p>
          <button className="delete" aria-label="close" onClick={() => dispatch(toggleHelpModal())} />
        </header>
        <section className="modal-card-body help-wrapper ta-j">
          <div className="content is-small-medium">
            <MemoryRouter>
              <Switch>
                <Route path={helpRoutes.associativeEntities} component={() => HelpWrapper(AssociativeEntities({setCode}))} />
                <Route path={helpRoutes.compositeAttributes} component={() => HelpWrapper(CompositeAttributes({setCode}))} />
                <Route exact path="/" component={() => Home()} />
                <Route path={helpRoutes.multivalued} component={() => HelpWrapper(MultivaluedAttributes({setCode}))} />
                <Route path={helpRoutes.relationships} component={() => HelpWrapper(Relationships({setCode}))} />
                <Route path={helpRoutes.selfRelationships} component={() => HelpWrapper(SelfRelationships({setCode}))} />
                <Route path={helpRoutes.specializations} component={() => HelpWrapper(Specializations({setCode}))} />
                <Route path={helpRoutes.unions} component={() => HelpWrapper(Unions({setCode}))} />
                <Route path={helpRoutes.weakEntities} component={() => HelpWrapper(WeakEntities({setCode}))} />
              </Switch>
            </MemoryRouter>
          </div>
        </section>
        <footer className="modal-card-foot jc-flex-end">
          <button className="button" onClick={() => dispatch(toggleHelpModal())}>
            OK
          </button>
        </footer>
      </div>
    </div>
  )
})

export { HelpModal }
