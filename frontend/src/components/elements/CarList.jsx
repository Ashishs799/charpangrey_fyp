import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../contextApi/Context";
import "../styles/CarList.css";

import { GiSpeedometer } from "react-icons/gi";
import { GiGearStickPattern } from "react-icons/gi";
import { BsFuelPump } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { BsArrowUpRight } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { EmptyList } from "./EmptyList";
import { UserContext } from "../../contextApi/UserContext";

export const CarList = ({ condition, brandName, bodyType }) => {
  const { allCars } = useContext(Context);
  const [sortBy, setSortBy] = useState("");
  const {
    userDetail,
    fetchUserDetails,
    addToWishlist,
    removeFromWishlist,
    isCarInWishlist,
  } = useContext(UserContext);

  let filteredCars = brandName
    ? allCars.filter((car) => car.make === brandName)
    : allCars;
  if (condition) {
    filteredCars = allCars.filter((car) => car.condition === condition);
  }

  if (bodyType) {
    filteredCars = allCars.filter((car) => car.type === bodyType);
  }
  const sortCars = (sortType) => {
    switch (sortType) {
      case "lowest":
        filteredCars.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case "highest":
        filteredCars.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case "ascending":
        filteredCars.sort((a, b) => a.carName.localeCompare(b.carName));
        break;
      case "descending":
        filteredCars.sort((a, b) => b.carName.localeCompare(a.carName));
        break;

      default:
        break;
    }
  };
  sortCars(sortBy);

  useEffect(() => {
    if (!userDetail) {
      fetchUserDetails();
    }
  }, [userDetail, fetchUserDetails]);

  if (!userDetail) {
    return <div>Loading...</div>; // or any other loading indicator
  }
  return (
    <div className="car_list sections">
      <div className="section_wrapper  public-m">
        <div className="flex_column">
          <div>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <span style={{ color: "#1bf72e" }}>Home</span>
            </Link>{" "}
            /{" "}
            <Link to={"/listing"} style={{ textDecoration: "none" }}>
              <span style={{ color: "#1bf72e" }}>listing</span>
            </Link>{" "}
            / <span>{condition}</span>
          </div>
          <h2 className="heads" style={{ color: "#000", marginTop: "20px" }}>
            {condition}
          </h2>
        </div>
        <div className="sorting_header flex_row">
          <span>Showing all {filteredCars.length} results</span>
          <div className="sort_selection">
            <span>Sort by: </span>{" "}
            <form action="#">
              <label htmlFor="sort"></label>
              <select
                name="sort"
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default" selected>
                  Default
                </option>
                <option value="lowest">Price(lowest)</option>
                <option value="highest">Price(highest)</option>
                <option value="ascending">Price(a-z)</option>
                <option value="descending">Price(z-a)</option>
              </select>
            </form>
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="car_details_box">
            {filteredCars.map((cars) => (
              <div key={cars.id} className="car-detail">
                <div
                  className="bookmark"
                  onClick={() => {
                    if (isCarInWishlist(cars.id)) {
                      removeFromWishlist(cars.id);
                    } else {
                      addToWishlist(cars.id);
                    }
                  }}
                >
                  {isCarInWishlist(cars.id) ? (
                    <BsBookmarkCheckFill style={{ color: "#1bf72e" }} />
                  ) : (
                    <BsBookmark />
                  )}
                </div>{" "}
                {/* Implement Conditional  Bookmark here*/}
                <div className="featuredimg">
                  <img src={cars.image[0]} alt="" />
                </div>
                <Link to={`/car-details/${cars.id}`}>
                  <h2 className="title ml">{cars.carName}</h2>
                </Link>
                <div className="car-features ml">
                  <div className="mileage flex-column">
                    <GiSpeedometer />
                    <span>{cars.mileage}</span>
                  </div>
                  <div className="fueltype flex-column">
                    <BsFuelPump />
                    <span>{cars.fuelType}</span>
                  </div>
                  <div className="transmission flex-column">
                    <GiGearStickPattern />
                    <span>{cars.transmission}</span>
                  </div>
                </div>
                <div className="prices ml">
                  <span className="price">Rs. {cars.discountedPrice}</span>
                  <Link
                    to={`/car-details/${cars.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <span
                      style={{
                        width: "55px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        textDecoration: "none !important",
                        color: "#1BF72E",
                        fontSize: "1.2em",
                        fontWeight: "700",
                      }}
                    >
                      View <BsArrowUpRight />
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyList make={brandName} bodyType={bodyType} />
        )}
      </div>
    </div>
  );
};
