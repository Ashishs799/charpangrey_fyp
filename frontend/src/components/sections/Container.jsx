import React, { useContext } from "react";
import "../styles/Container.css";
import Sell from "../assets/sale.png";
import Buy from "../assets/sell.png";
import { BsArrowUpRight } from "react-icons/bs";
import { Context } from "../../contextApi/Context";
import Brands from "./Brands";
import ReusableComp from "./ReusableComp";
import Testimonials from "./Testimonials";
import Blogs from "./Blogs";
import { Link } from "react-router-dom";

const Container = () => {
  const { CarType } = useContext(Context);
  console.log("Car types are", CarType);
  return (
    <div className="section-I">
      <div className="carType public-m">
        <h2 className="heads">Browse By Type</h2>
        <div className="browseType">
          {CarType.map((type) => {
            return (
              <Link
                to={`/types/${type.name}`}
                style={{ textDecoration: "none" }}
              >
                <div key={type.id} className="types">
                  <img src={type.image} alt="" />
                  <span>{type.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="buy-sell-car public-m">
        <div className="looking-car">
          <h2 className="heads">Are you looking For a car ?</h2>
          <span>
            We are committed to providing our customers with exceptional
            service.
          </span>
          <div className="btns">
            <Link to="/listing" style={{ textDecoration: "none" }}>
              <button>
                Get Started
                <BsArrowUpRight style={{ marginLeft: "10px" }} />
              </button>
            </Link>
            <img src={Buy} alt="" />
          </div>
        </div>
        <div className="sell-car">
          <h2 className="heads">Do You Want to Sell a Car ?</h2>
          <span>
            We are committed to providing our customers with exceptional
            service.
          </span>
          <div className="btns">
            <Link to="/sell-car" style={{ textDecoration: "none" }}>
              <button>
                Get Started <BsArrowUpRight style={{ marginLeft: "10px" }} />
              </button>
            </Link>
            <img src={Sell} alt="" />
          </div>
        </div>
      </div>
      <div className="featuredcars public-m">
        <h2 className="featured-head heads">Featured Cars</h2>
        <ReusableComp offerType="featured" />
      </div>
      <Brands />
      <div className="featuredcars public-m">
        <h2 className="featured-head heads">Popular Cars</h2>
        <ReusableComp offerType="Popular" />
      </div>
      <Testimonials />
      <Blogs />
    </div>
  );
};

export default Container;
