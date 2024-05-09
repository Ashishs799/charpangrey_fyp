import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/bookings.css";
import "../styles/listings.css";

const Bookings = () => {
  const { carId } = useParams();
  const [bookings, setBookings] = useState([]);
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

  return (
    <div className="bookings">
      <div className="booking__wrapper">
        <h2 className="booking__title">Booking</h2>

        <div className="filter__widget-wrapper">
          <div className="filter__widget-01">
            <select>
              <option value="New">New</option>
              <option value="Popular">Popular</option>
              <option value="Upcoming">Upcoming</option>
            </select>
          </div>

          <div className="filter__widget-01">
            <select>
              <option value="toyota">Toyota</option>
              <option value="bmw">Bmw</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>

        <div class="table-users">
          <table cellspacing="0">
            <tr className="heads">
              <th>S.N</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Car ID</th>
              <th>Car</th>
              <th>Image</th>
              <th>Destination</th>
              <th>Booking Date</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {bookings.map((booking, index) => (
              <>
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.carId}</td>
                  <td>{booking.carName}</td>
                  <td>
                    <img src={booking.image} alt="" />
                  </td>
                  <td>{booking.destination}</td>
                  <td>
                    {new Date(booking.bookingDate).toISOString().split("T")[0]}
                  </td>

                  <td>
                    {booking.pickupHour}
                    {":"}
                    {booking.pickupMin}
                    {":"}
                    {booking.pickupPeriod}
                  </td>
                  <td>{booking.status}</td>
                  <td>
                    <select name="action" id="" className="select_option">
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="booked">Booked</option>
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

export default Bookings;
