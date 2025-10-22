import { useState, useRef } from "react";
import LogRegStyles from "../../css/LogReg.module.css";
import api from "../Axios.js";

export default function Register ({inputEnabled, setInputEnabled, enableInput, setMessage, setDiv, token, handleToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const regButtonRef = useRef();//use .current, current.style, etc.
  const regCancelRef = useRef();

  // handlers
    function handleName (event) {
      setName(event.target.value);
    }

    function handleEmail (event) {
      setEmail(event.target.value);
    }

    function handlePassword1 (event) {
        setPassword1(event.target.value);
    }

    function handlePassword2 (event) {
      setPassword2(event.target.value);
    }
    // async func for handleRegister
    async function handleRegister () {
        if (!inputEnabled) return;
          
        if (password1 != password2) {
            setMessage("The passwords entered do not match");
            return;
        } 
       enableInput(false);
        try {
          const response = await api.post(
            "/auth/register",
            { name, email, password: password1 },
            { headers: { 
              Authorization: `Bearer ${token}`
            } });
          const data = response.data;

          if (response.status === 201) {
            setMessage(`Registration successful! Welcome ${data.user.name}!`); //may need to do data.user?.name || ""
            handleToken(data.token || null);
            setEmail("");
            setPassword1("");
            setPassword2("");
            setDiv("games")
          } else {
            setMessage(data.msg || "Registeration unsuccessful. Please try again."); //add || "Custom message"
          }
        } catch (err) {
          console.error(err);
          // use if/else to create better error messages!!
          //err.response, err.response.data, err.response.data.msg
          setMessage("A communications error has occurred.");
        }
        setInputEnabled(true);
      } 
  
    function handleCancel () {
        setName("");
        setEmail("");
        setPassword1("");
        setPassword2("");
        if (setDiv) {
           setDiv("default");
        }
    }
   
    function showRegister() {
      handleRegister();
    }

    return(
        <>
          <div className={LogRegStyles.RegisterDiv}>
            <form>
              <div>
                {" "}
                <label htmlFor="name">Name:</label> <input type="text" className={LogRegStyles.Name} value={name} onChange={handleName}/>{" "}
              </div>
              <div>
                {" "}
                <label htmlFor="email1">Email:</label>{" "}
                <input type="email" className={LogRegStyles.Email} value={email} onChange={handleEmail}/>{" "}
              </div>
              <div>
                {" "}
                <label htmlFor="password1">Password:</label>{" "}
                <input type="password" className={LogRegStyles.Pwd1} value={password1} onChange={handlePassword1}/>{" "}
              </div>
              <div>
                {" "}
                <label htmlFor="password2">Verify password:</label>{" "}
                <input type="password" className={LogRegStyles.Pwd2} value={password2} onChange={handlePassword2}/>{" "}
              </div>

              <div style={{display: "flex"}}>
                  <button type="button" className={LogRegStyles.RegBtn} ref={regButtonRef} onClick={showRegister}>
                Register
              </button>{" "}
              <button type="button" className={LogRegStyles.RegCancel} ref={regCancelRef} onClick={handleCancel}>
                Cancel
              </button>
              </div>
            
            </form>
          </div>
        </>
    )
}