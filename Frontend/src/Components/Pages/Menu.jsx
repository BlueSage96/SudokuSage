import { useNavigate } from "react-router-dom";
import MenuStyles from "../../css/Menu.module.css";
import MenuButtonStyles from "styled-components";
import BG from "../../assets/background.png";

import Settings from "../../assets/settings.png";
import Controls from "../../assets/controls.png";
import Instructions from "../../assets/instructions.png";
import SignIn from "../../assets/SignIn1.png";

const Buttons = MenuButtonStyles.button`
    background: none;
    border: none;
`;

function Menu() {
    const navigate = useNavigate();

    function handleSettings() {
        navigate("/settings");
    }

    function handleControls() {
        navigate("/controls");
    }

    function handleInstructions() {
        navigate("/instructions");
    }

    function handleAuth() {
        navigate("/auth");
    }

    return (
        <>
          <img src={BG} className={MenuStyles.Title} alt="Background image"/>
          <div className={MenuStyles.Options}>
            <Buttons onClick={handleSettings}>
                <img src={Settings} className={MenuStyles.Settings} alt="Settings button"/>
            </Buttons>

            <Buttons onClick={handleControls}>
                <img src={Controls} className={MenuStyles.Controls} alt="Controls button"/>
            </Buttons>

            <Buttons onClick={handleInstructions}>
                <img src={Instructions} className={MenuStyles.Inst} alt="Instructions button"/>
            </Buttons>

            <Buttons onClick={handleAuth}>
                <img src={SignIn} className={MenuStyles.SignIn} alt="Sign in button"/>
            </Buttons>
          </div>
        </>
    )
}

export default Menu;