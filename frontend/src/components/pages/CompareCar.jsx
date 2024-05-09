import React from "react";
import "../styles/CompareCar.css";
import { Link } from "react-router-dom";
import Compare from "../elements/Compare";

function CompareCar() {
  return (
    <div className=" sections ">
      <div className="section_wrapper  public-m">
        <div className="flex_column">
          <div>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <span style={{ color: "#1bf72e" }}>Home</span>
            </Link>{" "}
            / <span>Compare</span>
          </div>
          <h2 className="heads" style={{ color: "#000", margin: "20px 0" }}>
            Compare
          </h2>
        </div>
        <div className="flex_row comparisions">
          <Compare />
          <Compare />
          <Compare />
          <Compare />
        </div>
      </div>
    </div>
  );
}

export default CompareCar;
