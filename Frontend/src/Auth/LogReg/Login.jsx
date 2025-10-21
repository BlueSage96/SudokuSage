import { useState, useRef } from "react";
import LogRegStyles from "../../css/LogReg.module.css";
import api from "../Axios.js";

export default function Login({ inputEnabled, enableInput, setDiv,
  setMessage,
 
  handleToken,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginButtonRef = useRef();
  const loginCancelRef = useRef();

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function handleLogin() {
    if (!inputEnabled) return;
    enableInput(false);
    const controller = new AbortController(); //axios & JS - cancel panding reqeuest if component unmounts
    // let isMounted = true;
    try {
      const response = await api.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.data;
      if (response.status === 200) {
        setMessage(`Login successful. Welcome ${data.user.name}!`);

        handleToken(data.accessToken || data.token);
        setEmail("");
        setPassword("");
        setDiv("games");
      } else {
        setMessage(data.msg || "An error has occurred");
      }
    } catch (err) {
      //defensive reads (optional chaining/fallback)
      console.error("Login error:", {
        status: err.response?.status,
        data: err.response?.data,
      });
      setMessage(
        err.response?.data?.msg || err.response?.data?.error || "Login failed"
      );
    }
    enableInput(true);
  }

  function handleCancel() {
    setEmail("");
    setPassword("");
    if (setDiv) {
      setDiv("default");
    }
  }

  function showLogin() {
    handleLogin();
  }
  return (
    <>
      <div className={LogRegStyles.LoginDiv}>
        {/* onSubmit for handleLogin e.preventDefault */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <div>
            {" "}
            <label htmlFor="email" className={LogRegStyles.EmailTxt}>
              Email:
            </label>{" "}
            <input
              type="email"
              className={LogRegStyles.Email}
              value={email}
              onChange={handleEmail}
            />{" "}
          </div>
          <div>
            {" "}
            <label htmlFor="password" className={LogRegStyles.PwdTxt}>
              Password:
            </label>{" "}
            <input
              type="password"
              className={LogRegStyles.Pwd1}
              value={password}
              onChange={handlePassword}
            />{" "}
          </div>{" "}
          <div style={{ display: "flex" }}>
            <button
              type="button"
              className={LogRegStyles.LoginBtn}
              ref={loginButtonRef}
              onClick={showLogin}
            >
              Login
            </button>{" "}
            <button
              type="button"
              className={LogRegStyles.LoginCancel}
              ref={loginCancelRef}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
