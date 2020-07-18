import React,{ Fragment } from "react"
import { Link } from "react-router-dom"

import { helpRoutes } from "./helpRoutes"

export const HelpWrapper = (child: JSX.Element): JSX.Element => (
  <Fragment>
    <div className="back-button">
      <Link to={helpRoutes.home}>{"< Back"}</Link>
    </div>
    {child}
  </Fragment>
)
