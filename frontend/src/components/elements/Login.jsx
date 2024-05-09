import "../styles/Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

const Login = ({ setIsLoggedIn, action, formData, changeHandler }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  async function submitHandler(event) {
    if (action === "Login") {
      event.preventDefault();

      console.log("LOGIN DETAILS\n", formData);
      try {
        let responseData;
        const response = await fetch("http://localhost:4000/api/users/login", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        responseData = await response.json();
        console.log("Response in login ", responseData);
        if (responseData.success) {
          localStorage.setItem("auth-token", responseData.token);
          localStorage.setItem("id", responseData.id);

          if (
            formData.email === "admin@gmail.com" &&
            formData.password === "@@csh999"
          ) {
            window.location.href = "http://localhost:3100";
            setIsLoggedIn(false);
            return; // Make sure to return after the redirection
          }
          navigate("/");
          toast.success("You're logged in successfully.");
          setIsLoggedIn(true);
        } else {
          toast.error("Invalid email or password. Please try again.");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Failed to log in. Please try again.");
        setIsLoggedIn(false);
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div>
      <div className="inputs">
        <div className="email icons">
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="password icons">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Password"
            id="password"
            onChange={changeHandler}
            required
          />
          <span onClick={togglePasswordVisibility}>
            {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
          </span>
        </div>
        <div className="forgot">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            id="remember"
            onChange={changeHandler}
          />
          <label htmlFor="remember"> Remember me</label>
          <span>Forgot password?</span>
        </div>
        <div className="loginBtn btn">
          <button type="submit" onClick={submitHandler} className="mutualbtn">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
