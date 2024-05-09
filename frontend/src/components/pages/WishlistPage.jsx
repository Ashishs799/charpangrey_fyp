import React, { useContext, useState, useEffect } from "react";
import { GiSpeedometer } from "react-icons/gi";
import { GiGearStickPattern } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowUpRight } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { UserContext } from "../../contextApi/UserContext";
import "../styles/WishlistPage.css";
import axios from "axios";

export const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("id");
  const {

    removeFromWishlist,
    isCarInWishlist,
  } = useContext(UserContext);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Fetch wishlist car IDs from the backend
        const response = await axios.get(
          `http://localhost:4000/api/users/wishlist/${userId}`
        );

        // Assuming the backend returns wishlist car IDs in response.data.wishlist
        const wishlistCarIds = response.data.wishlist;

        // Fetch details of each car in the wishlist
        const promises = wishlistCarIds.map(async (carId) => {
          const carResponse = await axios.get(
            `http://localhost:4000/api/cars/car/${carId}`
          );
          return carResponse.data; // Assuming the backend returns car details
        });

        const wishlistCars = await Promise.all(promises);
        setWishlist(wishlistCars);
        console.log("Wishlist Cars", wishlist);
      } catch (error) {
        console.log("Error fetching wishlist:", error);
        // Handle error
      }
    };

    fetchWishlist();
  }, [userId]);
  return (
    <div className=" sections ">
      <div className="section_wrapper  public-m">
        <div className="featuredlist wishlists">
          {wishlist.map((car) => (
            <div key={car.id} className="car-detail">
              <div
                className="bookmark"
                onClick={() => {
                  if (isCarInWishlist(car.id)) {
                    removeFromWishlist(car.id);
                  }
                }}
              >
                {isCarInWishlist(car.id) ? (
                  <BsBookmarkCheckFill style={{ color: "#1bf72e" }} />
                ) : (
                  <BsBookmark />
                )}
              </div>{" "}
              {/* Implement Conditional  Bookmark here*/}
              <div className="featuredimg">
                <img src={car.image[0]} alt="" />
              </div>
              <Link to={`/car-cars/${car.id}`}>
                {" "}
                <h2 className="title ml">{car.carName}</h2>
              </Link>
              <div className="car-features ml">
                <div className="mileage flex-column">
                  <GiSpeedometer />
                  <span>{car.mileage}</span>
                </div>
                <div className="fueltype flex-column">
                  <BsFuelPump />
                  <span>{car.fuelType}</span>
                </div>
                <div className="transmission flex-column">
                  <GiGearStickPattern />
                  <span>{car.transmission}</span>
                </div>
              </div>
              <div className="prices ml">
                <span className="price">Rs. {car.discountedPrice}</span>
                <Link
                  to={`/car-details/${car.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <button className="view_details">
                    <span
                      style={{
                        width: "55px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#fff",
                        fontSize: "1.2em",
                        fontWeight: "700",
                      }}
                    >
                      View <BsArrowUpRight />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
