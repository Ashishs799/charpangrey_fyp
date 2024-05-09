import React, { useContext } from "react";
import { Context } from "../../contextApi/Context";
import { Link } from "react-router-dom";
import "../styles/Brands.css";

const Brands = () => {
  const { carBrands } = useContext(Context);
  const { ChooseUs } = useContext(Context);
  return (
    <section className="brands_section">
      <div className="carType public-m">
        <h2 className="heads">Explore Our Premium Brands</h2>
        <div className="browseType">
          {carBrands.map((brand) => {
            return (
              <div key={brand.id}>
                <Link
                  to={`/brands/${brand.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="types brands">
                    <img src={brand.image} alt="" />
                    <span>{brand.name}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="why_choose_us">
        <h2 className="heads">Why Choose Us?</h2>
        <div className="choice_container public-m">
          {ChooseUs.map((choice) => (
            <div className="choices " key={choice.id}>
              <div className="choices_img_box">
                <img src={choice.logo} alt="" />
              </div>
              <span>{choice.service}</span>
              <p>{choice.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
