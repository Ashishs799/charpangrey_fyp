import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import "../styles/AdvancedFilter.css";
import MainSlider from "../slider/MainSlider";
import ScrollButton from "../slider/ScrollButton";
import Container from "../sections/Container";
import "../styles/Home.css";
import Footer from "../elements/Footer";

export const Home = ({ carData, CarType }) => {
  return (
    <div className="main-container">
      <section className="main">
        <div
          style={{ height: "fit-content", objectFit: "cover" }}
          className="Home"
        >
          <MainSlider carData={carData} />
          <div className="filter">
            <h2>Find Your Dream Car</h2>
            <div className="advance-filter">
              <div className="filters">
                <select name="carType" id="carType">
                  <option value="new">New Cars</option>
                  <option value="used">Used Cars</option>
                </select>

                <select name="make" id="make">
                  <option value="" disabled selected>
                    Any Makes
                  </option>
                  <option value="audi">Audi</option>
                  <option value="bmw">BMW</option>
                  <option value="tata">Tata</option>
                  <option value="suzuki">Suzuki</option>
                  <option value="toyota">Toyota</option>
                </select>

                <select name="models" id="models">
                  <option value="" disabled selected>
                    Any Models
                  </option>
                  <option value="bmw7series">BMW 7 Series</option>
                  <option value="tatatiago">Tata Tiago</option>
                  <option value="toyotalandcruiser">Toyota Land Cruiser</option>
                  <option value="toyotasupra">Toyota Supra</option>
                </select>

                <select name="price" id="price">
                  <option value="" disabled selected>
                    Any Prices
                  </option>
                  <option value="100000-200000">100000-200000</option>
                  <option value="200000-300000">200000-300000</option>
                  <option value="300000-400000">300000-400000</option>
                  <option value="400000-500000">400000-500000</option>
                </select>
              </div>

              <div className="search">
                <RiSearch2Line />
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="listing">
        <Container />
      </section>
      <Footer />
    </div>
  );
};
