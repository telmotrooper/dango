import React from "react"

import { specializations } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

export const Specializations = (): JSX.Element => (
  <div>
    <p className="paragraph">
      <b>Specializations</b> allow us to declare entities which share attributes with other entities.
    </p>
    <p>Example 1 - Total and disjoint:</p>
    <ExampleCodebox code={specializations} rows={11} />
    <p className="paragraph text-after-codebox">TODO: WRITE ABOUT SPECIALIZATIONS HERE.</p>
  </div>
)
