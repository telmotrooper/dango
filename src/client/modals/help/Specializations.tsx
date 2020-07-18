import React from "react"

import { specializations } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

interface Props {
  setCode: (code: string) => void;
}

export const Specializations = (props: Props): JSX.Element => (
  <div>
    <p className="paragraph">
      <b>Specializations</b> allow us to declare entities which share attributes with other entities.
    </p>
    <p>Example 1 - Total and disjoint:</p>
    <ExampleCodebox code={specializations} setCode={props.setCode} rows={11} />
    <p className="paragraph text-after-codebox">TODO: WRITE ABOUT SPECIALIZATIONS HERE.</p>
  </div>
)
