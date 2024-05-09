import React from "react";

const CarItem = (props) => {
  const { make, fuelType, transmission, image, carName } = props.item;
  return (
    <div className="car__item">
      <div className="car__item-top">
        <div className="car__item-tile">
          <h3>{carName}</h3>
          <span>
            <i class="ri-heart-line"></i>
          </span>
        </div>
        <p>{make}</p>
      </div>

      <div className="car__img">
        <img src={image} alt="" />
      </div>

      <div className="car__item-bottom">
        <div className="car__bottom-left">
          <p>{fuelType}</p>
          <p>
            <i class="ri-repeat-line"></i>
            {transmission}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
