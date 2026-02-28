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
           <img src={BG} className={MenuStyles.Background} alt="Main menu background image"/>
            <Button onClick={handleAuth}>
                <img src={SignIn} className={MenuStyles.SignIn}/>
            </Button>
        </>
    )
}