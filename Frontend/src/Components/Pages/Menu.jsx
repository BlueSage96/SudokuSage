import { Button } from "flowbite-react";
import MenuStyles from "../../css/Menu.module.css";
import BG from "../../assets/background.png";
import SignIn from "../../assets/SignIn1.png";

export default function Menu () {
    return (
        <>
           <img src={BG} className={MenuStyles.Background} alt="Main menu background image"/>
            <Button>
                <img src={SignIn} className={MenuStyles.SignIn}/>
            </Button>
        </>
    )
}