import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/CarDetails.css";
import { BiCalendar } from "react-icons/bi";
import { SlSpeedometer } from "react-icons/sl";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Review } from "../elements/Review";

const CarDetails = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState(null);
  const [reloadAndScroll, setReloadAndScroll] = useState(false);
  const handleReloadAndScroll = () => {
    setReloadAndScroll(true);
    window.location.reload();
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 1000);
  }; 
  useEffect(() => {
    // Fetch car details based on the id from the database
    fetch(`http://localhost:4000/api/cars/car/${id}`)
      .then((response) => response.json())
      .then((data) => setCarDetails(data));
  }, [id]);

  if (!carDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="car_details sections">
      <div className="section_wrapper car_details_wrapper public-m">
        <h1>{carDetails.carName}</h1>
        <div className="quick_info flex_row">
          <div className="infos">
            <BiCalendar /> {carDetails.year}
          </div>
          <div className="infos">
            <SlSpeedometer /> {carDetails.mileage}
          </div>
          <div className="infos">
            <GiGearStickPattern /> {carDetails.transmission}
          </div>
          <div className="infos">
            <BsFuelPump /> {carDetails.fuelType}
          </div>
        </div>
        <div className="small_container">
          <div>
            <div className="img_container">
              <div className="images_box">
                <img src={carDetails.image[0]} alt="" />
              </div>
              <div className="images_box2">
                {carDetails.image.length > 1 &&
                  carDetails.image.slice(1).map((image, index) => (
                    <div className="multiple_img">
                      <img key={index} src={image} alt="" />
                    </div>
                  ))}
              </div>
            </div>
            <div className="book_offer flex_row">
              <div>
                <MdOutlineLocalOffer /> Make an offer price
              </div>
              <Link
                to={`/car-details/${id}/booking`}
                style={{ textDecoration: "none" }}
              >
                <div>
                  <AiOutlineSchedule /> Book a Car
                </div>
              </Link>
            </div>
            <div className="overview">
              <h2>Overview</h2>
              <div className="info_table">
                <div className="info">
                  <span>Year </span>
                  <p>{carDetails.year}</p>
                </div>
                <div className="info">
                  <span>Make </span>
                  <p>{carDetails.make}</p>
                </div>
                <div className="info">
                  <span>Model </span>
                  <p>{carDetails.model}</p>
                </div>
                <div className="info">
                  <span>Body Type </span>
                  <p>{carDetails.type}</p>
                </div>
                <div className="info">
                  <span>Mileage </span>
                  <p>{carDetails.mileage}</p>
                </div>
                <div className="info">
                  <span>Condition </span>
                  <p>{carDetails.condition}</p>
                </div>
                <div className="info">
                  {" "}
                  <span>Fuel Type </span>
                  <p>{carDetails.fuelType}</p>
                </div>
                <div className="info">
                  <span>Transmission </span>
                  <p>{carDetails.transmission}</p>
                </div>
                <div className="info">
                  <span>Doors </span>
                  <p>{carDetails.door}</p>
                </div>
                <div className="info">
                  <span>Cylinder </span>
                  <p>{carDetails.cylinder}</p>
                </div>
                <div className="info">
                  <span>Color </span>
                  <p>{carDetails.color}</p>
                </div>
                <div className="info">
                  <span>Drive Type </span>
                  <p>{carDetails.drive_Type}</p>
                </div>
                <div className="info">
                  <span>Seats </span>
                  <p>{carDetails.seats}</p>
                </div>
                <div className="info">
                  <span>Engine Size </span>
                  <p>{carDetails.engine_Size}</p>
                </div>
              </div>
            </div>
            <div className="desc">
              <h2>Description</h2>
              <div className="desc_2">
                <div className="desc_wrapper">
                  <div className="overall_rating">
                    <span>Overall Rating</span>
                    <h2>4.5</h2>
                    <span>Out of 5</span>
                  </div>
                </div>

                <div className="descBox">
                  <p>{carDetails.description}</p>
                </div>
              </div>
            </div>
            <Review
              carId={carDetails.id}
              carname={carDetails.carName}
              reloadAndScroll={handleReloadAndScroll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
