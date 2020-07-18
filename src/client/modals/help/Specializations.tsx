import React from "react"

import { specializations } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

export const Specializations = (): JSX.Element => (
  <div>
    <p className="paragraph">
      <b>Self-relationships</b> are relationships on which an entity connects to itself.
    </p>
    <p>Example 1 - Same cardinalities:</p>
    <ExampleCodebox code={specializations} rows={6} />
    <p className="paragraph text-after-codebox">TODO: WRITE ABOUT SPECIALIZATIONS HERE</p>
  </div>
)
