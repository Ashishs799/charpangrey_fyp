import React, { useContext, useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Review.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contextApi/UserContext";

export const Review = ({ carId, carname, reloadAndScroll }) => {
  const { userDetail, fetchUserDetails } = useContext(UserContext);
  const [text, setText] = useState("");
  // const [userDetail, setUserDetail] = useState(null);
  const [carDetail, setCarDetail] = useState(null);
  const [reviews, setReviews] = useState(null);
  // const userId = useParams();
  console.log("Car Id", carId);
  useEffect(() => {
    if (!userDetail) {
      fetchUserDetails();
      console.log("Review ma car details \n", carDetail);
    }
  }, [userDetail, fetchUserDetails]);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  async function fetchCarDetails() {
    try {
      const response = await fetch(
        `http://localhost:4000/api/cars/car/${carId}`
      );
      const carData = await response.json();
      if (response.ok) {
        // User details fetched successfully

        console.log("Car Data are: ", carData);
        setCarDetail(carData);
        // Now you can use userData to display user details in your frontend UI
      } else {
        // Error occurred while fetching user details
        console.error(`Error in fething car details: ${carData.message}`);
      }
    } catch (error) {
      // Network error or other issues
      console.error(`Error: ${error.message}`);
    }
  }
  useEffect(() => {
    fetchCarDetails();
  }, []);

  useEffect(() => {
    console.log("Car Details: ", carDetail); // Log userDetail after it's updated
  }, [carDetail]);
  const handleSubmit = async () => {
    if (!userDetail) {
      console.error("User details are not available.");
      return;
    }
    console.log(userDetail);
    try {
      const response = await axios.post("http://localhost:4000/api/review", {
        reviewer: userDetail.name,
        car: carDetail.carName,
        text,
      });
      console.log("Response of review", response.data);
      // const reviewData = response.data;
      // setReviews(reviewData);

      toast.success("Your review has been submitted.");
      reloadAndScroll();
      // Optionally, update UI to show the new comment
    } catch (error) {
      console.error("Error Occured Yaha", error);
    }
  };
  async function fetchReviews() {
    try {
      const response = await fetch("http://localhost:4000/api/reviews");
      const reviewData = await response.json();
      if (response.ok) {
        // User details fetched successfully

        console.log("Reviews Data are: ", reviewData);
        const filteredReviews = reviewData.filter(
          (review) => review.car === carname
        );
        setReviews(filteredReviews);
        // Now you can use userData to display user details in your frontend UI
      } else {
        // Error occurred while fetching user details
        console.error(`Error in fething review details: ${reviewData.message}`);
      }
    } catch (error) {
      // Network error or other issues
      console.error(`Error: ${error.message}`);
    }
  }
  useEffect(() => {
    fetchReviews();
  }, []);
  useEffect(() => {
    console.log("Reviews are:", reviews);
  }, [reviews]);

  return (
    <div className="review">
      <h2>Add a review</h2>
      <div className="stars">
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
        <FaRegStar />
      </div>
      <div>
        <div className="review_container">
          {reviews &&
            reviews.map((review, index) => (
              <div className="review_box" key={index}>
                <div className="reviewer">
                  <p>{review.reviewer}</p>
                  <span>
                    posted at{" "}
                    {new Date(review.postedAt).toISOString().split("T")[0]}
                  </span>
                </div>
                <div className="review">
                  <p>{review.text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="text_area">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          id=""
          cols=""
          rows="10"
          placeholder="Your Review"
        ></textarea>
      </div>
      <div>
        <button className="button_review" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};
