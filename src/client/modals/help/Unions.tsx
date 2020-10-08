import React, { Fragment } from "react"
import { Link } from "react-router-dom"

import { union } from "../../utils/erExamples"
import { ExampleCodebox } from "./ExampleCodebox"
import { helpRoutes } from "./helpRoutes"

interface Props {
  setCode: (code: string) => void;
}

export const Unions = (props: Props): JSX.Element => 
  <Fragment>
    <p>
      <b>Unions</b> allow us to declare a category or group of entities. Using them, we can define a set of rules that will apply to more than one type of entity.
    </p>

    <p>
      Notice though that, differently from <Link to={helpRoutes.specializations}>{"Specializations"}</Link>, entities in Unions always have both their own type and their Union type. Also, there is no instance of an entity which is solely of its Union type.
    </p>

    <p>Example:</p>
    <div className="columns">
      <div className="column">
        <ExampleCodebox code={union} setCode={props.setCode} rows={11} />
      </div>
      <div className="column">
        <p>
          In this example, we define that "Car" and "Truck" belong to category "Vehicle". There's no "Car" or "Truck" that is not also a "Vehicle" and
          there's no "Vehicle" which is not either a "Car" or a "Truck".
          Since a "Vehicle" has a "plate_number", "Car" and "Truck" will have this attribute as well.
          If we query for all "Vehicles", we'll get all instances of "Cars" and "Trucks".
        </p>
      </div>
    </div>
  </Fragment>
