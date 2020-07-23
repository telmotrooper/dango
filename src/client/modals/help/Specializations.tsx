import React, { Fragment } from "react"

import { specializationsTotalDisjoint, specializationsPartialOverlap } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

interface Props {
  setCode: (code: string) => void;
}

export const Specializations = (props: Props): JSX.Element => 
  <Fragment>
    <p>
      <b>Specializations</b> allow us to declare entities which share attributes with other entities.
    </p>

    <p><b>Completeness:</b></p>
    <p>
      A <b>total</b> specialization allows only instances of its children entities to exist, while
      a <b>partial</b> specialization allows instances of both parent and children entities to exist.
    </p>

    <p><b>Disjointedness:</b></p>
    <p>
      A <b>disjoint</b> specialization defines that an instance of a child entity can be of
      exactly one specialized type, while an <b>overlap</b> specialization allows them to have one or more specialized types.
    </p>

    <p>Example 1 - Total and disjoint:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={specializationsTotalDisjoint} setCode={props.setCode} rows={11} />
      </div>
      <div className="column">
        <p>
          In this example we define that for a Person to exist, they must be either a Developer or a Non-Developer (total).
          We also say that a Person can't be both a Developer and a Non-Developer at the same time (disjoint).
        </p>
      </div>
    </div>

    <p>Example 2 - Partial and overlap:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={specializationsPartialOverlap} setCode={props.setCode} rows={11} />
      </div>
      <div className="column">
        <p>
          In this example we define that a Person can be a Cyclist and/or a Driver (overlap), but there might be People who are neither (partial).
        </p>
      </div>
    </div>
  </Fragment>

