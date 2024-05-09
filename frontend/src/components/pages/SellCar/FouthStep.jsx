import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { multiStepContext } from "../../../contextApi/SellCarContext";
import upload_image from "../../assets/upload.png";
export const FourthStep = () => {
  const { setStep, sellerData, setSellerData, submitSellerData } =
    useContext(multiStepContext);
  const [Image, setImage] = useState(false);
  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>Seller Info</h2>
      <div>
        <div className="upload_area">
          <img src={Image ? URL.createObjectURL(Image) : upload_image} alt="" />
          <span>Click to upload</span>

          <input
            type="file"
            placeholder="Upload Image"
            id="upload_img"
            name="image"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div>
        <div className="upload_area">
          <img src={Image ? URL.createObjectURL(Image) : upload_image} alt="" />
          <span>Click to upload</span>

          <input
            type="file"
            placeholder="Upload Image"
            id="upload_img"
            name="image"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={() => setStep(3)}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={submitSellerData}>
          Submit
        </Button>
      </div>
    </div>
  );
};
