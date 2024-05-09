import React, { useContext, useState, useEffect } from "react";
import "../../styles/SellCar.css";
import { sellCar } from "../../Car_Data"; // Import the state management functions
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
// import upload_image from "../assets/images/upload.png";
import { FaUpload } from "react-icons/fa6";
import { UserContext } from "../../../contextApi/UserContext";

const SellCar = () => {
  const { userDetail, fetchUserDetails } = useContext(UserContext);
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!userDetail) {
      fetchUserDetails();
    }
  }, [userDetail, fetchUserDetails]);
  useEffect(() => {
    console.log("Seller Details\n", userDetail);
  }, [userDetail]);
  const [carDetails, setCarDetails] = useState({
    seller: userDetail.name,
    email: userDetail.email,
    carName: "",
    offerType: "Popular",
    type: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    condition: "New",
    transmission: "Automatic",
    description: "",
    oldPrice: "",
    discountedPrice: "",
    image: "",
    token_no: "",
    door: "",
    cylinder: "",
    color: "",
    drive_Type: "",
    seats: "",
    engine_Size: "",
  });

  // const [Image, setImage] = useState(false);

  if (!userDetail) {
    return <div>Loading...</div>;
  }
  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    // setImage(e.target.files[0]);
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    sellCar(carDetails); // Use the state management function to add the car
    // Reset the form after saving changes
    toast.success("Car added successfully !!");

    // Sending to Backend
    let responseData;
    let car = carDetails;
    let formData = new FormData();
    images.forEach((image, index) => {
      formData.append("car", image);
    });
    // formData.append("car", Image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Response from /upload endpoint:", data);
        responseData = data;
      });
    console.log("Multiple images ko response data\n", responseData);
    if (responseData.success) {
      //  product instead of car if error happened
      car.image = responseData.image_url;
      console.log("Car Details in Backend\n", car);
      await fetch("http://localhost:4000/api/sellcar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(car),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? toast.success("Car Added In Backend")
            : toast.warning("Error While Adding Car To The Database");
        });
    }
    setCarDetails({
      seller: userDetail.name,
      email: userDetail.email,
      carName: "",
      offerType: "Popular",
      type: "",
      make: "",
      model: "",
      year: "",
      mileage: "",
      fuelType: "",
      condition: "New",
      transmission: "Automatic",
      description: "",
      oldPrice: "",
      discountedPrice: "",
      image: "",
      token_no: "",
      door: "",
      cylinder: "",
      color: "",
      drive_Type: "",
      seats: "",
      engine_Size: "",
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setCarDetails({
      seller: userDetail.name,
      email: userDetail.email,
      carName: "",
      offerType: "Popular",
      type: "",
      make: "",
      model: "",
      year: "",
      mileage: "",
      fuelType: "",
      condition: "New",
      transmission: "Automatic",
      description: "",
      oldPrice: "",
      discountedPrice: "",
      image: "",
      token_no: "",
      door: "",
      cylinder: "",
      color: "",
      drive_Type: "",
      seats: "",
      engine_Size: "",
    });
    toast.error("Discard Changes!!");
  };
  return (
    <div className="Addcar sections">
      <div className="addcar-wrapper">
        <h2 className="addcar_title">Sell Your Car</h2>
        <div className="addcar-form">
          <h2 className="cardetail_title">Car Details</h2>
          <form>
            <div className="form__group">
              <div>
                <label>
                  Car Name
                  <sup>
                    <span>*</span>
                  </sup>
                </label>
                <input
                  type="text"
                  placeholder="Eg. BMW X8"
                  name="carName"
                  value={carDetails.carName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Offer Type</label>
                <select
                  name="offerType"
                  value={carDetails.offerType}
                  id="offer_type"
                  onChange={handleInputChange}
                  className="select_option"
                >
                  <option value="popular">Popular</option>
                  <option value="featured">Featured</option>
                  <option value="hot-deals">Hot Deals</option>
                </select>
              </div>
              <div>
                <label>Type</label>
                <input
                  type="text"
                  placeholder="Eg. SUV, Sedan, Coupe.."
                  name="type"
                  value={carDetails.type}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Make</label>
                <input
                  type="text"
                  placeholder="Eg. BMW, Audi.."
                  name="make"
                  value={carDetails.make}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Model</label>
                <input
                  type="text"
                  placeholder="Eg. X7, Almera.."
                  name="model"
                  value={carDetails.model}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Year</label>
                <input
                  type="text"
                  placeholder="Eg. 2024"
                  name="year"
                  value={carDetails.year}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Mileage</label>
                <input
                  type="text"
                  placeholder="Eg. 160 KM"
                  name="mileage"
                  value={carDetails.mileage}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Fuel Type</label>
                <input
                  type="text"
                  placeholder="Eg. Petrol"
                  name="fuelType"
                  value={carDetails.fuelType}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Condition</label>
                <select
                  name="condition"
                  value={carDetails.condition}
                  id=""
                  className="select_option"
                  onChange={handleInputChange}
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div>
                <label>Transmission</label>
                <select
                  name="transmission"
                  value={carDetails.transmission}
                  id=""
                  className="select_option"
                  onChange={handleInputChange}
                >
                  <option value="New" selected>
                    Automatic
                  </option>
                  <option value="Used">Manual</option>
                  <option value="Used">Semi-automatic</option>
                </select>
                {/* <input
                  type="text"
                  placeholder="Eg. Manual"
                  name="transmission"
                  value={carDetails.transmission}
                  onChange={handleInputChange}
                /> */}
              </div>
              <div>
                <label>Token</label>
                <input
                  type="text"
                  placeholder="Eg. HYU123456"
                  name="token_no"
                  value={carDetails.token_no}
                  onChange={handleInputChange}
                />
              </div>
              <div className="addcar_desc">
                <div>
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={carDetails.description}
                    onChange={handleInputChange}
                    id="textarea"
                    cols="30"
                    rows="10"
                    style={{ resize: "none", background: "transparent" }}
                  ></textarea>
                  {/* <input type="text" className="desc" /> */}
                </div>
              </div>
            </div>
            <div className="addcar-form price-form">
              <h2 className="cardetail_title">Price</h2>
              <div className="form__group flex-group">
                <div className="prices">
                  <label>Old Price</label>
                  <input
                    type="text"
                    name="oldPrice"
                    value={carDetails.oldPrice}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="prices">
                  <label>Discounted Price</label>
                  <input
                    type="text"
                    placeholder="Eg. 500,000"
                    name="discountedPrice"
                    value={carDetails.discountedPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="addcar-form price-form media">
              <h2 className="cardetail_title">Media</h2>
              <div className="form__group flex-group">
                <div className="prices upload-img">
                  <label>Select Images</label>
                  <label htmlFor="upload_img">
                    <div className="upload_area">
                      <div className="upload_box">
                        {images.length > 0 &&
                          images.map((image, index) => (
                            <div key={index} style={{ margin: "0" }}>
                              <img
                                src={URL.createObjectURL(image)}
                                alt=""
                                style={
                                  {
                                    // maxWidth: "50%",
                                    // maxHeight: "100px",
                                  }
                                }
                              />
                              <span style={{ fontSize: "12px" }}>
                                Image {index + 1}
                              </span>
                            </div>
                          ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-between",
                          // background:"yellow"
                        }}
                      >
                        <FaUpload style={{ fontSize: "3em" }} />
                        <span>Click to upload</span>
                      </div>
                      <input
                        type="file"
                        placeholder="Upload Image"
                        id="upload_img"
                        name="image"
                        onChange={handleImageChange}
                        multiple
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className="addcar-form extra_info">
              <h2 className="cardetail_title">Additional Info</h2>
              <div className="form__group flex-group">
                <div className="prices">
                  <label>Door</label>
                  <input
                    type="text"
                    name="door"
                    value={carDetails.door}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="prices">
                  <label>Cylinder</label>
                  <input
                    type="text"
                    placeholder="Eg. 500,000"
                    name="cylinder"
                    value={carDetails.cylinder}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="prices">
                  <label>Color</label>
                  <input
                    type="text"
                    name="color"
                    value={carDetails.color}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="prices">
                  <label>Drive Type</label>
                  <input
                    type="text"
                    placeholder="Eg. Rear-Wheel Drive"
                    name="drive_Type"
                    value={carDetails.drive_Type}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="prices">
                  <label>Seating Capacity</label>
                  <input
                    type="text"
                    placeholder="Eg. 4"
                    name="seats"
                    value={carDetails.seats}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="prices">
                  <label>Engine Size</label>
                  <input
                    type="text"
                    placeholder="Eg. 3.5
                    "
                    name="engine_Size"
                    value={carDetails.engine_Size}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="add_car_btn">
              <button className="save__btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button className="cancel__btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellCar;
