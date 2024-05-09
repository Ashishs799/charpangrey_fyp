import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";
import axios from "axios";
import { useParams } from "react-router-dom";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";

const Dashboard = () => {
  const [allCars, setAllCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const { carId } = useParams();

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

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/booking/bookcar`);
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  useEffect(() => {
    console.log("Bookings in Admin site \n", bookings);
  }, [bookings]);

  useEffect(() => {
    fetchBookings();
  }, [carId]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/users/allusers"
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const carObj = {
    title: "Total Cars",
    totalNumber: allCars.length,
    icon: "ri-police-car-line",
  };

  const tripObj = {
    title: "Total Bookings",
    totalNumber: bookings.length,
    icon: "ri-steering-2-line",
  };

  const clientObj = {
    title: "Total Users",
    totalNumber: users.length,
    icon: "ri-user-line",
  };

  const distanceObj = {
    title: "Kilometers Daily",
    totalNumber: 2167,
    icon: "ri-timer-flash-line",
  };
  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">Miles Statistics</h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Car Statistics</h3>
            <CarStatsChart />
          </div>
        </div>

        <div className="recommend__cars-wrapper">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
