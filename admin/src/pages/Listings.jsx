import React, { useEffect, useState } from "react";
import "../styles/listings.css";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { carData } from "../assets/dummy-data/CarData";
import { toast } from "react-toastify";
import axios from "axios";

const Listings = () => {
  const [allCars, setAllCars] = useState([]);

  const fetchCarInfo = async () => {
    await axios
      .get("http://localhost:4000/api/cars/allcars")
      .then((res) => {
        setAllCars(res.data);
      })
      .catch(console.error());
  };

  useEffect(() => {
    fetchCarInfo();
  }, []);

  // Function to handle the delete button click event

  const removeCar = async (id) => {
    await fetch("http://localhost:4000/api/cars/removecar", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchCarInfo();
  };
  return (
    <div className="listings">
      <h2>Car Listings</h2>
      <div class="table-users">
        <table cellspacing="0">
          <tr className="heads">
            <th width="10">S.N</th>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Make</th>
            <th>Model</th>
            <th>Mileage</th>
            <th>Fuel Type</th>
            <th>Price</th>
            <th>Condition</th>
            <th>Year</th>
            <th>Token</th>
            {/* <th width="230">Description</th> */}
            <th>Status</th>
            <th width="100">Action</th>
          </tr>
          {allCars &&
            allCars.map((car, index) => (
              <>
                <tr key={car.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={car.image[0]} alt="" />
                  </td>
                  <td>{car.carName}</td>
                  <td>{car.type}</td>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.mileage}</td>
                  <td>{car.fuelType}</td>
                  <td>{car.discountedPrice}</td>
                  <td>{car.condition}</td>
                  <td>{car.year}</td>
                  <td>{car.token_no}</td>
                  {/* <td style={{ fontSize: "10px" }}>{car.description}</td> */}
                  <td>Pending</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "16px",
                        gap: "10px",
                      }}
                    >
                      <RiEdit2Fill style={{ color: "#dbd51b" }} />
                      <RiDeleteBin2Fill
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          removeCar(car.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
                <hr />
              </>
            ))}
        </table>
      </div>
    </div>
  );
};

export default Listings;
