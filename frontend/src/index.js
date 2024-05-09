import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ContextProvider from "./contextApi/Context";
import TestimonialContextProvider from "./contextApi/TestimonialContext";
import BlogsProvider from "./contextApi/DummyBlogsContext";
import SellCarContext from "./contextApi/SellCarContext";
import UserContextProvider from "./contextApi/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <UserContextProvider>
      <SellCarContext>
        <TestimonialContextProvider>
          <BlogsProvider>
            <BrowserRouter>
              <App />
              <ToastContainer />
            </BrowserRouter>
          </BlogsProvider>
        </TestimonialContextProvider>
      </SellCarContext>
    </UserContextProvider>
  </ContextProvider>
);
