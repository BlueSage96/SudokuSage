import { useState } from "react";
import { Button } from "flowbite-react";
import Register from "./Register"
import Login from "./Login";

export default function LogReg () {
    const [makeForm, setMakeForm] = useState("signup");
    /* 
      refactor: colored toggle instead or along with buttons
      OR wrap in a dive that has a color toggle overlayed on buttons
    */
    return (
      <>
        {/* onClick={setMakeFrom} -> would cause infinite loop */}
        <div className="title-style">
          <Button
            color="black"
            className={`btn-style-1 m-2 card-themed ${makeForm == "signup" ? "active" : ""}`}
            onClick={() => setMakeForm("signup")}>Register</Button>

          <Button
            color="black"
            className={`btn-style-1 m-2 card-themed ${makeForm == "login" ? "active" : ""}`}
            onClick={() => setMakeForm("login")}>Login</Button>
        </div>

        {/* Below is "truthy" because of the useState init value */}
        {makeForm === "signup" ? <Register /> : <Login />}
      </>
    );

}