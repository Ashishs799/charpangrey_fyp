import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/pages/LoginForm";
import { Home } from "./components/pages/Home";
import SignupForm from "./components/pages/SignupForm";
import Navbar from "./components/elements/Navbar";
import { useState } from "react";
import About from "./components/pages/About";
import carData from "./data";
import CarDetails from "./components/pages/CarDetails";
import Booking from "./components/elements/Booking";
import UsedCars from "./components/pages/UsedCars";
import NewCars from "./components/pages/NewCars";
import { CarList } from "./components/elements/CarList";
import { CarBrands } from "./components/pages/CarBrands/CarBrands";
import { BodyTypes } from "./components/pages/CarTypes/BodyTypes";
import SellCar from "./components/pages/SellCar/SellCar";
import { WishlistPage } from "./components/pages/WishlistPage";
import CompareCar from "./components/pages/CompareCar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="app">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home carData={carData} />} />
        <Route path="/aboutus" element={<About />} />
        <Route
          path="/login"
          element={
            <LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignupForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/listing" element={<CarList />} />
        <Route path="/brands/:brandName" element={<CarBrands />} />
        <Route path="/types/:bodyType" element={<BodyTypes />} />
        <Route path="/listing/newcars" element={<NewCars />} />
        <Route path="/listing/usedcars" element={<UsedCars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/car-details/:id/booking" element={<Booking />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/sell-car" element={<SellCar />} />
        <Route path="/compare" element={<CompareCar />} />
        <Route path="*" element={<div>404 Error....</div>} />
      </Routes>
    </div>
  );
}

export default App;
