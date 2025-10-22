import { useRef } from "react";
import LogRegStyles from "../../css/LogReg.module.css";
export default function LoginRegister ({ setDiv }) {
    const loginRef = useRef();
    const registerRef = useRef();

    function Login() {
       setDiv("login");
    }

    function Register() {
       setDiv("register");
    }
    return (
      <>
        <div className={LogRegStyles.LogReg}>
          {" "}
          <button type="button" className={LogRegStyles.RGLoginBtn} ref={loginRef} onClick={Login}>
            Login
          </button>{" "}
          <button type="button" className={LogRegStyles.LGRegBtn} ref={registerRef} onClick={Register}>
            Register
          </button>{" "}
        </div>
      </>
    );
}