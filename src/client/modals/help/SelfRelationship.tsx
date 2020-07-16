import React from "react"

import { selfRelationshipSameCardinality, selfRelationshipDifferentCardinalities } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

export const SelfRelationship = (): JSX.Element => (
  <div>
    <p className="paragraph">
      <b>Self-relationships</b> are relationships on which an entity connects to itself.
    </p>
    <p>Example 1 - Same cardinality:</p>
    <ExampleCodebox code={selfRelationshipSameCardinality} rows={6} />
    <p>Example 2 - Different cardinalities:</p>
    <ExampleCodebox code={selfRelationshipDifferentCardinalities} rows={6} />
  </div>
)
