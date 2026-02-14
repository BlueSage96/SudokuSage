import { useState } from "react";
import { Button } from "flowbite-react";
import Register from "./Register"
import Login from "./Login";

export default function LogReg () {
    const [makeForm, setMakeForm] = useState("signup");

    return (
      <>
        {/* onClick={setMakeFrom} -> would cause infinite loop */}
        <div className="flex items-center justify-center cursor: pointer">
            {/* makeFrom ternary for colors */}
          <Button color={makeForm == "signup" ? "blue" : "black"} 
          className={`btn-style-1 ${makeForm == "signup" ? "active" : ""}`} type="button" onClick={() => {
            setMakeForm("signup");
              console.log("Toggle signup");
            }}>
            Register
          </Button>
        

       
          <Button color="black" className={`btn-style-1 ${makeForm == "login" ? "active" : ""}`} onClick={() => { 
            setMakeForm("login");
            console.log("Login on");
            }}>Login</Button>
        </div>
        
            {/* Below is "truthy" because of the useState init vakue */}
        {makeForm == "signup" ? (
          
         <Register/>
        ) : (
          <form>
            <Login/>
          </form>
        )}
      </>
    );

}