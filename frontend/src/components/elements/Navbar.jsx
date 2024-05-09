import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/carlogo.png";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Navbar.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../contextApi/UserContext";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { userDetail, fetchUserDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [backgroundStyle, setBackgroundStyle] = useState("");

  useEffect(() => {
    // Check if the current path is '/'navigate
    if (location.pathname === "/") {
      // Set transparent background for '/'
      setBackgroundStyle("transparent");
    } else {
      // Set #000 background for other paths
      setBackgroundStyle("#000");
    }
    if (!userDetail) {
      fetchUserDetails();
    }
  }, [location.pathname, userDetail, fetchUserDetails]);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="navbar">
      <header>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={Logo} alt="Logo" />
        </Link>
        <nav>
          <ul>
            <NavLink
              to="/listing/newcars"
              className="activeLink"
              style={{ textDecoration: "none" }}
            >
              <li>New Cars</li>
            </NavLink>
            <NavLink
              to="/listing/usedcars"
              className="activeLink"
              style={{ textDecoration: "none" }}
            >
              <li>Used Cars</li>
            </NavLink>
            <NavLink
              to="/services"
              className="activeLink"
              style={{ textDecoration: "none" }}
            >
              <li>Services</li>
            </NavLink>
            <NavLink
              to="/aboutus"
              className="activeLink"
              style={{ textDecoration: "none" }}
            >
              <li>About Us</li>
            </NavLink>
            <NavLink
              to="/contactus"
              className="activeLink"
              style={{ textDecoration: "none" }}
            >
              <li>Contact Us</li>
            </NavLink>
            <NavLink
              to="/compare"
              className="activeLink"
              style={{ textDecoration: "none" }}
            >
              <li>Compare</li>
            </NavLink>
            <NavLink
              to="/sell-car"
              className="activeLink"
              style={{ textDecoration: "none" }}
            >
              <li>Sell Car</li>
            </NavLink>
          </ul>
        </nav>
        <div className="logged-In-Out">
          {localStorage.getItem("auth-token") ? (
            // <span>Hi,{userDetail.name}</span>
            <div class="dropdown">
              <button class="dropbtn">
                <span>Hi,{userDetail.name}</span>
              </button>
              <div class="dropdown-content">
                <a href="#">Dashboard</a>
                <NavLink to={"/wishlist"}>Favourites</NavLink>
                <a href="#">Setting</a>

                <button
                  className="hoverEff"
                  onClick={() => {
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("id");
                    navigate("/");
                    setIsLoggedIn(false);
                    toast.success("Logged Out Successfully");
                  }}
                >
                  <CiLogout style={{ fontSize: "18px" }} /> Log Out
                </button>
              </div>
            </div>
          ) : (
            // <button
            //   className="hoverEff"
            //   onClick={() => {
            //     localStorage.removeItem("auth-token");
            //     localStorage.removeItem("id");
            //     navigate("/");
            //     setIsLoggedIn(false);
            //     toast.success("Logged Out Successfully");
            //   }}
            // >
            //   <CiLogout style={{ fontSize: "18px" }} /> Log Out
            // </button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="registerbtn hoverEff dropbtn">
                <CiUser style={{ fontSize: "18px", fontWeight: "700" }} /> Sign
                In
              </button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
