import React, { useEffect, useState } from "react";
import { CarList } from "../../elements/CarList";
import { useParams } from "react-router-dom";

export const BodyTypes = () => {
  const [types, setTypes] = useState([]);
  const { bodyType } = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/api/cars/types")
      .then((response) => response.json())
      .then((data) => setTypes(data));
  }, []);
  console.log("Types are\n", types);
  return <>{<CarList bodyType={bodyType} />}</>;
};
