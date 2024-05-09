import React from "react";
import '../styles/Slider.css'

const ScrollButton = () => {
  function handleScroll() {
    window.scrollBy(0, 800)
  }
  return (
    <div class="scrolldown" onClick={handleScroll}>
      <div class="box">
        <div class="circle"></div>
      </div>
    </div>
  );
};

export default ScrollButton;
