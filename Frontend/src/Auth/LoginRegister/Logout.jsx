import { useRef } from "react";
import LogRegStyles from "../../css/LogReg.module.css";
import api from "../Axios.js";

export default function Logout ({ inputEnabled, enableInput, setDiv, setMessage, token, handleToken }) {
    const logoutRef = useRef();
    async function handleLogout () {
        if (!inputEnabled) return; //checking for user input
        enableInput(false);

        try {
            const response = api.post("auth/logout", {
                headers: { Authorization: `Bearer ${token}`}
            });
            const status = response?.status ?? 204;
            const data = await response?.data ?? null;
            handleToken(null)
            setDiv("default");
            setMessage((data) || status === 204 ? "Logged out": "User has been logged out.");
        } catch (err) {
           console.error(err);
           setMessage("A communications error has occurred");
        } finally {
           enableInput(true);
        }
    }

    return (
        <>
            <button type="button" ref={logoutRef} className={LogRegStyles.Logoff} onClick={handleLogout}>Log Off</button>
        </>
    )
}