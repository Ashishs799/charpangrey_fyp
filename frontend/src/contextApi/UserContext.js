import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const id = localStorage.getItem("id");
  async function fetchUserDetails() {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/user/${id}`
      );
      const userData = await response.json();
      if (response.ok) {
        // User details fetched successfully

        console.log("User Data are: ", userData);
        setUserDetail(userData);
        // Now you can use userData to display user details in your frontend UI
      } else {
        // Error occurred while fetching user details
        console.error(`Error in fething user details: ${userData.message}`);
      }
    } catch (error) {
      // Network error or other issues
      console.error(`Error: ${error.message}`);
    }
  }
  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const addToWishlist = async (carId) => {
    try {
      if (!wishlist.includes(carId)) {
        const updatedWishlist = [...wishlist, carId];
        setWishlist(updatedWishlist);
        if (userDetail) {
          // Check if userDetail is not null
          await axios.post("http://localhost:4000/api/users/wishlist/add", {
            userId: userDetail._id,
            carId,
          });
          toast.success("Car added to wishlist.");
        } else {
          console.error("User detail is null."); // Handle error appropriately
        }
      }
    } catch (error) {
      console.log("Error adding to wishlist:", error);
      // Handle error
    }
  };

  const removeFromWishlist = async (carId) => {
    try {
      const updatedWishlist = wishlist.filter((id) => id !== carId);
      setWishlist(updatedWishlist);
      if (userDetail) {
        // Check if userDetail is not null
        await axios.post("http://localhost:4000/api/users/wishlist/remove", {
          userId: userDetail._id,
          carId,
        });
        toast.success("Car removed from wishlist.");
      } else {
        console.error("User detail is null."); // Handle error appropriately
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      // Handle error
    }
  };

  const isCarInWishlist = (carId) => {
    // console.log("Wishlist:", wishlist);
    return wishlist.includes(carId);
  };

  const data = {
    userDetail,
    fetchUserDetails,
    addToWishlist,
    removeFromWishlist,
    isCarInWishlist,
  };
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
export default UserContextProvider;
