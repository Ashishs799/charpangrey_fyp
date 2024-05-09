import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/CompareCar.css";
import { Context } from "../../contextApi/Context";

const Compare = () => {
  const [make, setMake] = useState("");
  const [models, setModels] = useState([]);
  const { allCars } = useContext(Context);
  const [showSelect, setShowSelect] = useState(false);
  let years = Array.from({ length: 26 }, (_, index) => 2000 + index);
  years = years.reverse();
  const handleButtonClick = () => {
    setShowSelect(true);
  };
  useEffect(() => {
    // Fetch models when component mounts
    fetchModels();
    console.log("Car in compare", allCars);
  }, [make]); // Fetch models whenever make changes

  const handleMakeChange = (event) => {
    const selectedMake = event.target.value;
    setMake(selectedMake);
  };

  const fetchModels = async () => {
    try {
      if (make) {
        // Only fetch models if make is selected
        const response = await axios.get(
          `http://localhost:4000/api/cars/models/${make}`
        );
        setModels(response.data);
      } else {
        // Reset models if no make is selected
        setModels([]);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  // Log models whenever it changes
  useEffect(() => {
    console.log("Models:", models);
  }, [models]);
  return (
    <div className="compare_car">
      {!showSelect && (
        <button onClick={handleButtonClick} className="compare_buttons">
          + Add Car
        </button>
      )}
      {showSelect && (
        <div className="flex_column compare_box">
          <select
            name="make"
            id="make"
            onChange={handleMakeChange}
            className="custom-select"
          >
            <option value="">Select Make</option>
            {allCars.map((car) => (
              <option key={car.id} value={car.make}>
                {car.make}
              </option>
            ))}
          </select>

          <select
            name="model"
            id="model"
            disabled={models.length === 0}
            className="custom-select"
          >
            <option value="">Select Model</option>
            {models.map((model, index) => (
              <option key={index} value={model.model}>
                {model.model}
              </option>
            ))}
          </select>
          <select
            name="year"
            id="year"
            onChange={handleMakeChange}
            className="custom-select"
            disabled={models.length === 0}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Compare;
