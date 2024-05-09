import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/bookings.css";
import "../styles/listings.css";

const SellerList = () => {
  const [sellers, setSeller] = useState([]);
  const fetchSeller = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/allsellers");
      if (!response.ok) {
        throw new Error("Failed to fetch seller list");
      }
      const data = await response.json();
      setSeller(data);
    } catch (error) {
      console.error("Error fetching seller list:", error);
    }
  };
  useEffect(() => {
    console.log("Sellers in Admin site \n", sellers);
  }, [sellers]);

  useEffect(() => {
    fetchSeller();
  }, []);

  return (
    <div className="bookings">
      <div className="booking__wrapper">
        <h2 className="booking__title">Seller</h2>

        <div class="table-users">
          <table cellspacing="0">
            <tr className="heads">
              <th>S.N</th>
              <th>Seller</th>
              <th>Email</th>
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
            <th>Action</th>
            </tr>
            {sellers.map((seller, index) => (
              <>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{seller.seller}</td>
                  <td>{seller.email}</td>
                  <td>
                    <img src={seller.image[0]} alt="" />
                  </td>
                  <td>{seller.sellerName}</td>
                  <td>{seller.type}</td>
                  <td>{seller.make}</td>
                  <td>{seller.model}</td>
                  <td>{seller.mileage}</td>
                  <td>{seller.fuelType}</td>
                  <td>{seller.discountedPrice}</td>
                  <td>{seller.condition}</td>
                  <td>{seller.year}</td>
                  <td>
                    <select name="action" id="" className="select_option">
                      <option value="pending">Pending</option>
                      <option value="processing">Approve</option>
                      <option value="booked">Cancel</option>
                    </select>
                  </td>
                </tr>
                <hr />
              </>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerList;
