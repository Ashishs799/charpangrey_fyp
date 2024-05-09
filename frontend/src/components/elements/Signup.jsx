import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useState } from "react";

const Signup = ({ setIsLoggedIn, action, formData, changeHandler }) => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  async function submitHandler(event) {
    if (action === "Sign Up") {
      event.preventDefault();

      // console.log("SIGNUP DETAILS\n", formData);
      try {
        let responseData;
        const response = await fetch("http://localhost:4000/api/users/signup", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        responseData = await response.json();

        console.log("Response in Signup ", responseData);
        if (responseData.success) {
          localStorage.setItem("auth-token", responseData.token);
          navigate("/login");
          toast.success("You're registered in successfully.");
          setIsLoggedIn(false);
        } else {
          toast.error("User already existed with this email ID");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("Failed to sign up. Please try again.");
        setIsLoggedIn(false);
      }
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="inputs">
      <div className="name icons">
        <input
          type="text"
          placeholder="Username"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="email icons">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          required
        />
      </div>
      <div className="password icons">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="pass"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          required
        />
        <span onClick={togglePasswordVisibility}>
          {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
        </span>
      </div>
      <div className="loginBtn btn">
        <button type="submit" className="mutualbtn" onClick={submitHandler}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
