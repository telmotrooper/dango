import React,{ Fragment } from "react"
import { Link } from "react-router-dom"

export const HelpWrapper = (child: JSX.Element): JSX.Element => (
  <Fragment>
    <div className="back-button">
      <Link to="/">{"< Back"}</Link>
    </div>
    {child}
  </Fragment>
)
