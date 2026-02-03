import MenuStyles from "../../css/Menu.module.css";
import BG from "../../assets/background.png";

export default function Menu () {
    return (
        <>
           <img src={BG} className={MenuStyles.Background} alt="Main menu background image"/>
           
        </>
    )
}