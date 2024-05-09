import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const multiStepContext = createContext();
const SellCarContext = ({ children }) => {
  const [currentStep, setStep] = useState(1);
  const [sellerData, setSellerData] = useState([]);
  const [finalSellerData, setFinalSellerData] = useState([]);

  const submitSellerData = async () => {
    setFinalSellerData((prevFinalSellerData) => [
      ...prevFinalSellerData,
      sellerData,
    ]);
    console.log("Seller Data\n", sellerData);
    try {
      let responseData;
      let sellerInfo = sellerData;
      let formData = new FormData();
      formData.append("car", Image);
      await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });
      if (responseData.success) {
        sellerInfo.image = responseData.image_url
        await fetch("http://localhost:4000/api/add-seller", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(sellerInfo), 
        })
          .then((resp) => resp.json())
          .then((data) => {
            data.success
              ? toast.success("Seller Added In Backend")
              : toast.warning("Error While Adding Seller To The Database");
          });
      }

      // Optionally, update UI to show the new comment
    } catch (error) {
      console.error("Internal Error During Adding Seller", error);
    }
    setSellerData({});

  };
  /*
    
    */

  useEffect(() => {
    console.log("Final Seller Details", finalSellerData);
  }, [finalSellerData]);
  return (
    <multiStepContext.Provider
      value={{
        currentStep,
        setStep,
        sellerData,
        setSellerData,
        finalSellerData,
        setFinalSellerData,
        submitSellerData,
      }}
    >
      {children}
    </multiStepContext.Provider>
  );
};

export default SellCarContext;
