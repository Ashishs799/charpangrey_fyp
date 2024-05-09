import React, { useContext, useEffect, useState } from "react";
import { CarList } from "../../elements/CarList";
import { useParams } from "react-router-dom";

export const CarBrands = () => {
  const [brands, setBrands] = useState([]);
  const {brandName} = useParams()

  useEffect(() => {
    fetch("http://localhost:4000/api/cars/makes")
      .then((response) => response.json())
      .then((data) => setBrands(data));
  }, []);
  console.log("Brands are\n", brands);
    return <>{<CarList brandName={brandName} brand={brands}/>}</>;
};
