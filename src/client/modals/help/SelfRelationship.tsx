import React from "react"

import { selfRelationshipSameCardinality, selfRelationshipDifferentCardinalities } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"

export const SelfRelationship = (): JSX.Element => (
  <div>
    <p>
      <b>Self-relationships</b> are relationships on which an entity connects to itself.
    </p>
    <p>Example 1 - Same cardinality:</p>
    <ExampleCodebox code={selfRelationshipSameCardinality} />
    <p>Example 2 - Different cardinalities:</p>
    <ExampleCodebox code={selfRelationshipDifferentCardinalities} />
  </div>
)
