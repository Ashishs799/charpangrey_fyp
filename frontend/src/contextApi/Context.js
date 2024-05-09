import React, { createContext, useEffect, useState } from "react";

import SUV from "../components/assets/suv.png";
import Sedan from "../components/assets/sedan.png";
import Hatchback from "../components/assets/hatchback.png";
import Truck from "../components/assets/truck.png";
import Coupe from "../components/assets/coupe.png";
import Hybrid from "../components/assets/electric.png";
import Convertible from "../components/assets/convertible.png";
import Electric from "../components/assets/electric-car.png";

import Mahindra from "../components/assets/mahindra.png";
import Nissan from "../components/assets/nissan.png";
import Toyota from "../components/assets/toyota.png";
import Hyundai from "../components/assets/hyundai.png";
import Suzuki from "../components/assets/suzuki.png";
import Tata from "../components/assets/tata.png";

import Trust from "../components/assets/trustful.png";
import CarDealership from "../components/assets/buycar.png";
import CarSale from "../components/assets/carsale.png";
import Support from "../components/assets/support.png";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [allCars, setAllCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/cars/allcars")
      .then((response) => response.json())
      .then((data) => setAllCars(data));
  }, []);
  // const [CarType, setCarType] = useState([
  const CarType = [
    {
      id: 1,
      image: SUV,
      name: "SUV",
    },
    {
      id: 2,
      image: Sedan,
      name: "Sedan",
    },
    {
      id: 3,
      image: Hatchback,
      name: "Hatchback",
    },
    {
      id: 4,
      image: Truck,
      name: "Truck",
    },
    {
      id: 5,
      image: Hybrid,
      name: "Hybrid",
    },
    {
      id: 6,
      image: Convertible,
      name: "Convertible",
    },
    {
      id: 7,
      image: Coupe,
      name: "Coupe",
    },
    {
      id: 8,
      image: Electric,
      name: "Electric",
    },
  ];

  const carBrands = [
    {
      id: 1,
      name: "Toyota",
      image: Toyota,
    },
    {
      id: 2,
      name: "Nissan",
      image: Nissan,
    },
    {
      id: 3,
      name: "Maruti Suzuki",
      image: Suzuki,
    },
    {
      id: 4,
      name: "Tata",
      image: Tata,
    },
    {
      id: 5,
      name: "Mahindra",
      image: Mahindra,
    },
    {
      id: 6,
      name: "Hyundai",
      image: Hyundai,
    },
  ];

  const ChooseUs = [
    {
      id: 1,
      service: "Find best choice",
      desc: "Explore diverse options to discover the perfect vehicle suiting your preferences and needs.",
      logo: CarDealership,
    },
    {
      id: 2,
      service: "Trusted car dealership",
      desc: "Rely on our reputable dealership for transparent transactions and reliable vehicles.",
      logo: Trust,
    },
    {
      id: 3,
      service: "Hassle-free selling process",
      desc: "Sell your car stress-free. Our platform streamlines the process, ensuring you get the best value hassle-free",
      logo: CarSale,
    },
    {
      id: 4,
      service: "Expert guidance and support",
      desc: "Expert support ensures informed decisions, personalized assistance, and finding ideal vehicles or buyers.",
      logo: Support,
    },
  ];

  const data = {
    CarType,
    carBrands,
    ChooseUs,
    allCars,
  };
  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default ContextProvider;
