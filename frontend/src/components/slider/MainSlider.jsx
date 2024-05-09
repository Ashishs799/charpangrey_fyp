import React, { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Slider } from "./Slider";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import '../styles/Slider.css'

const MainSlider = ({ carData }) => {
  const [index, setIndex] = useState(0);
  function slideBack() {
    if (index - 1 < 0) {
      setIndex(carData.length - 1);
    //   toast.success("Back to last video");
    } else {
      setIndex(index - 1);
    //   toast.success(`Back video ${index - 1}`);
    }
  }
  function slideForward() {
    if (index + 1 >= carData.length) {
      setIndex(0);
    //   toast.success("Back to first video");
    } else {
      setIndex(index + 1);
    //   toast.success(`Next video ${index + 1}`);
    }
  }
  return (
    <div className="main">
      <Slider carVid={carData[index]} />
      <div className="arrows">
        <MdArrowBackIos
          style={{ fontSize: "2.5rem", color: "#A4A71E", cursor: "pointer" }}
          onClick={slideBack}
        />
        <MdArrowForwardIos
          style={{ fontSize: "2.5rem", color: "#A4A71E", cursor: "pointer" }}
          onClick={slideForward}
        />
      </div>
    </div>
  );
};

export default MainSlider;
