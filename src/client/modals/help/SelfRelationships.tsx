import React from "react"

import { selfRelationships } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

interface Props {
  setCode: (code: string) => void;
}

export const SelfRelationships = (props: Props): JSX.Element => 
  <div>
    <p>
      <b>Self-relationships</b> are relationships on which an entity connects to itself, to work with them we must specify roles for each side of the relationship.
    </p>
    
    <p>Example:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={selfRelationships} setCode={props.setCode} rows={6} />
      </div>
      <div className="column">
        <p>
          In this example, we define a relationship "supervision" between instances of the entity "Worker". One side is the "supervisor" and the other is the "supervisee".
        </p>
      </div>
    </div>
  </div>

