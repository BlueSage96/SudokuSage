import LogReg from "./LogReg/LogReg";
import ThemeSwitcher from "../Hooks/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
// add a back button
export default function Auth () {
    const navigate = useNavigate();

    return (
     <>
        <Button onClick={()=> navigate(-1)} className="btn-style-2 absolute left-[100px]">&larr; Back</Button>
        <ThemeSwitcher/>
         <LogReg/>   
     </>
    )
}