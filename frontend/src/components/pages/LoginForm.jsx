import React,{useState} from "react";
import Template from "../elements/Template";

export const LoginForm = ({setIsLoggedIn}) => {
    const [action, setAction] = useState("Login");
  return <Template action={action} setAction={setAction} setIsLoggedIn={setIsLoggedIn}/>;
};
