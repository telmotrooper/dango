import React from "react"
import { Link } from "react-router-dom"

export const HelpWrapper = (child: JSX.Element): JSX.Element => (
  <div className="ta-j">
    <Link to="/">{"< Back"}</Link>
    {child}
  </div>
)
