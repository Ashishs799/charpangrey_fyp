import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Booking.css";
const Booking = () => {
  // const hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    destination: "",
    bookingDate: "",
    pickupHour: "",
    pickupMin: "",
    pickupPeriod: "AM",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/api/booking/bookcar/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("FormData hru ", formData);
      if (!response.ok) {
        throw new Error("Failed to book car");
      }
      alert("Car booked successfully!");
      // Optionally, you can reset the form here
      setFormData({
        name: "",
        email: "",
        phone: "",
        pickupLocation: "",
        destination: "",
        bookingDate: "",
        // pickupTime: "",
        pickupHour: "10",
        pickupMin: "00",
        pickupPeriod: "AM",
      });
    } catch (error) {
      console.error("Error booking car:", error);
      alert("Failed to book car");
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch additional data or perform any action with carId
      console.log("Car Ko ID hai:", id);
    }
    console.log("FormData hru booking ko:\n", formData);
  }, [id]);
  return (
    <div id="booking" className="section">
      <div className="section-center">
        <div className="container">
          <div className="row">
            <div className="booking-form">
              <div className="form-header">
                <h1>Book a car</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row form_row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <span className="form-label">Name</span>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <span className="form-label">Email</span>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <span className="form-label">Phone</span>
                  <input
                    className="form-control"
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <span className="form-label">Pickup Location</span>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter ZIP/Location"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <span className="form-label">Destination</span>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter ZIP/Location"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <div className="form-group">
                      <span className="form-label">Preferred Date</span>
                      <input
                        className="form-control"
                        type="date"
                        required
                        name="bookingDate"
                        value={formData.bookingDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <span className="form-label">Hour</span>
                          <select
                            className="form-control"
                            name="pickupHour"
                            value={formData.pickupHour}
                            onChange={handleChange}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10" selected="selected">
                              10
                            </option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <span className="form-label">Min</span>
                          <select
                            className="form-control"
                            name="pickupMin"
                            value={formData.pickupMin}
                            onChange={handleChange}
                          >
                            <option value="00" selected="selected">
                              00
                            </option>
                            <option value="05">05</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="45">45</option>
                            <option value="50">50</option>
                            <option value="55">55</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <span className="form-label">AM/PM</span>
                          <select
                            className="form-control"
                            name="pickupPeriod"
                            value={formData.pickupPeriod}
                            onChange={handleChange}
                          >
                            <option value="AM" selected="selected">
                              AM
                            </option>
                            <option value="PM">PM</option>
                          </select>
                          <span className="select-arrow"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-btn">
                  <button className="submit-btn">Book Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
