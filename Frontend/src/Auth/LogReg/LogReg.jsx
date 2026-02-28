import { useState } from "react";
import { Button } from "flowbite-react";
import Register from "./Register"
import Login from "./Login";

export default function LogReg () {
    const [makeForm, setMakeForm] = useState("signup");

    return (
      <>
        {/* onClick={setMakeFrom} -> would cause infinite loop */}
        <div className="flex items-center justify-center cursor: pointer text-black">
            {/* makeFrom ternary for colors */}
          <Button color="blue" 
          className={`btn-style-1 m-2 ${makeForm == "signup" ? "active" : ""}`} type="button" onClick={() => 
            setMakeForm("signup")}>
            Register
          </Button>
        
          <Button color="black" className={`btn-style-1 m-2 ${makeForm == "login" ? "active" : ""}`} onClick={() => 
            setMakeForm("login")}>Login</Button>
        </div>
        
        {/* Below is "truthy" because of the useState init value */}
        {makeForm === "signup" ? (
         <Register/>
        ) : (
          <form>
            <Login/>
          </form>
        )}
      </>
    );

}