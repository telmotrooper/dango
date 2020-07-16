import React from "react"
import { Link } from "react-router-dom"

export const HelpWrapper = (child: JSX.Element): JSX.Element => (
  <div className="ta-j">
    <div className="back-button">
      <Link to="/">{"< Back"}</Link>
    </div>
    {child}
  </div>
)
