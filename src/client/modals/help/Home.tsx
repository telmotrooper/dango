import React from "react"
import logo from "../../assets/dango.png"
import { Link } from "react-router-dom"

export const Home = (): JSX.Element => (
  <div className="ta-j">
    <img src={logo} className="center logo mb-1" />
    <p>
      <b>Dango</b> is a graph database modeling tool which allows you to write a schema for a Neo4j database by writing an Entity-Relationship diagram.
    </p>
    <br/>
    <p>
      The schema generated is composed of <a target="_blank" rel="noreferrer" href="https://neo4j.com/docs/cypher-manual/current/administration/constraints/">Neo4j constraints</a> and <a target="_blank" rel="noreferrer" href="https://neo4j.com/docs/labs/apoc/current/background-operations/triggers/">APOC triggers</a>, which force the nodes and relationships in the database to behave as modeled.
    </p>
    <br/>
    <p><b>Conversion rules:</b></p>
    <ul>
      <li><Link to="/self-relationship">Self-relationship</Link></li>
    </ul>
    <p>
    </p>
  </div>
)