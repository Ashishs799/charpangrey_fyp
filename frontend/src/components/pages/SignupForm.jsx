import { useState } from "react";
import Template from "../elements/Template";
const SignupForm = ({setIsLoggedIn}) =>{
    const [action, setAction] = useState("Sign Up");
    return <Template action={action} setAction={setAction} setIsLoggedIn={setIsLoggedIn} />
}

export default SignupForm;