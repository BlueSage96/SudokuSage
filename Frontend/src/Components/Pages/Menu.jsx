import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MenuStyles from "../../css/Menu.module.css";
import BG from "../../assets/background.png";
import SignIn from "../../assets/SignIn1.png";


export default function Menu () {
    const navigate = useNavigate();

    function handleAuth () {
        navigate("/auth");
    }

    useEffect(() => {
      // Save current theme
      const currentTheme = document.documentElement.getAttribute("data-theme");

      // Remove theme for menu
      document.documentElement.removeAttribute("data-theme");

      // Restore theme when leaving menu
      return () => {
        if (currentTheme) {
          document.documentElement.setAttribute("data-theme", currentTheme);
        }
      };
    }, []);
    return (
      <>
        <div>
          <img
            src={BG}
            className={MenuStyles.Background}
            alt="Main menu background image"
          />
          <Button onClick={handleAuth}>
            <img src={SignIn} className={MenuStyles.SignIn} />
          </Button>
        </div>
      </>
    );
}