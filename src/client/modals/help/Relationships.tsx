import React, { Fragment } from "react"

import { relationshipExample } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

interface Props {
  setCode: (code: string) => void;
}

export const Relationships = (props: Props): JSX.Element => 
  <Fragment>
    <p>
      <b>Relationships</b> denote how Entities relate to each other. They contain Cardinalities
      which indicate how many of each Entity are connected through the relationship.
    </p>

    <p>Example:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={relationshipExample} setCode={props.setCode} rows={9} />
      </div>
      <div className="column">
        <p>
          In this example we define that entities Driver and Car are connected through a "has" relationship.
          Since the cardinalities in both directions are minimum 0 and maximum n we don't have any restriction
          on how many of each should be in a given relationship.
        </p>
      </div>
    </div>


    {/* <p>Example 2 - Partial and overlap:</p>
    <ExampleCodebox code={specializationsPartialOverlap} setCode={props.setCode} rows={11} />
    <p>
      In this example we define that a Person can be a Cyclist and/or a Driver (overlap), but there might be People who are neither (partial).
    </p> */}
  </Fragment>

