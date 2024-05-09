import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { multiStepContext } from "../../../contextApi/SellCarContext";
export const ThirdStep = () => {
  const { setStep, sellerData, setSellerData, submitSellerData } =
    useContext(multiStepContext);
  return (
    <div>
      <div>
        <TextField
          label="Car Name"
          margin="normal"
          variant="outlined"
          color="secondary"
          value={sellerData.carname}
          onChange={(e) =>
            setSellerData((prevSellerData) => ({
              ...prevSellerData,
              carname: e.target.value,
            }))
          }
        ></TextField>
      </div>
      <div>
        <TextField
          label="Model"
          margin="normal"
          variant="outlined"
          color="secondary"
          value={sellerData.model}
          onChange={(e) =>
            setSellerData((prevSellerData) => ({
              ...prevSellerData,
              model: e.target.value,
            }))
          }
        ></TextField>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={submitSellerData}>
          Submit
        </Button>
      </div>
    </div>
  );
};
