import { Button } from "flowbite-react";
import MenuStyles from "../../css/Menu.module.css";
import BG from "../../assets/background.png";
import SignIn from "../../assets/SignIn1.png";
import { useNavigate } from "react-router-dom";

export default function Menu () {
    const navigate = useNavigate();

    function handleAuth () {
        navigate("/auth");
    }
    return (
        <>
        {/* 
            1. make wrapper that ignores the theme switcher i.e. no-style
            2. do this in the module --> explicitly set background color
            * #2 would be better
        */}
           <img src={BG} className={MenuStyles.Background} alt="Main menu background image"/>
            <Button onClick={handleAuth}>
                <img src={SignIn} className={MenuStyles.SignIn}/>
            </Button>
        </>
    )
}