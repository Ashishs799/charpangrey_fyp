import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { multiStepContext } from "../../../contextApi/SellCarContext";

export const FirstStep = () => {
  const { setStep, sellerData, setSellerData } = useContext(multiStepContext);
  console.log("Seller ko data ho", sellerData);
  return (
    <div>
      <div>
        <TextField
          label="Seller Name"
          value={sellerData.seller}
          margin="normal"
          variant="outlined"
          color="secondary"
          onChange={(e) => {
            setSellerData((prevSellerData) => ({
              ...prevSellerData,
              seller: e.target.value,
            }));
          }}
        ></TextField>
      </div>
      <div>
        <TextField
          label="Email Address"
          value={sellerData.email}
          margin="normal"
          variant="outlined"
          color="secondary"
          onChange={(e) =>
            setSellerData((prevSellerData) => ({
              ...prevSellerData,
              email: e.target.value,
            }))
          }
        ></TextField>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={() => setStep(2)}>
          Get Started
        </Button>
      </div>
    </div>
  );
};
