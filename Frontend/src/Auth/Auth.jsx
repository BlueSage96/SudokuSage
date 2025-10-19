import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AuthStyles from "../css/Auth.module.css";
import LogReg from "./LogReg/LoginRegister";
import Register from "./LogReg/Register";
import Login from "./LogReg/Login";
import {
  ShowGames,
  HandleEditGames,
  HandleDeleteGames,
} from "./Games/GameFunc";

export default function Auth() {
  const [message, setMessage] = useState(null);
  const [inputEnabled, setInputEnabled] = useState(true);
  const [token, setToken] = useState(null);
  const [activeView, setActiveView] = useState("default");
  const [editGameId, setEditGameId] = useState(null);

  const navigate = useNavigate();

  const setDiv = (newDiv) => {
    setActiveView(newDiv);
  };

  const enableInput = useCallback((state) => {
    setInputEnabled(state);
  }, []);

  const handleToken = (value) => {
    setToken(value);
    if (value) {
      localStorage.setItem("token", value);
      //setActiveView("games");
    } else {
      localStorage.removeItem("token");
      setActiveView("default");
    }
  };

  useEffect(() => {
    let retrieveToken = localStorage.getItem("token");
    if (retrieveToken) {
      //setActiveView("games");
      setToken(retrieveToken); //preserve last active view
    } else {
      setToken(null);
      setActiveView("default");
    }
  }, []);

  return (
    <>
      <button className={AuthStyles.backButton} onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className={AuthStyles.GameContent}>
        {activeView === "default" && (
          <>
            <h1 className={AuthStyles.LogRegTitle}>Sudoku Sage Registration</h1>
            <LogReg inputEnabled={inputEnabled} setDiv={setDiv} />
          </>
        )}

        {activeView === "login" && (
          <>
            <div>
              <h1 className={AuthStyles.LogTitle}>Sudoku Sage Login</h1>
              <p className={AuthStyles.LogMsg}>{message}</p>
              <Login
                inputEnabled={inputEnabled}
                enableInput={enableInput}
                setDiv={setDiv}
                setMessage={setMessage}
                handleToken={handleToken}
              />
            </div>
          </>
        )}

        {activeView === "register" && (
          <>
            <div>
              <h1 className={AuthStyles.RegTitle}>Sudoku Sage Registration</h1>
              <p className={AuthStyles.RegMsg}>{message}</p>
              <Register
                inputEnabled={inputEnabled}
                setInputEnabled={setInputEnabled}
                enableInput={enableInput}
                setMessage={setMessage}
                setDiv={setDiv}
                token={token}
                handleToken={handleToken}
              />
            </div>
          </>
        )}

        {activeView === "games" && (
          <>
            <h1 className={AuthStyles.GameTitle}>Sudoku Sage Setup</h1>
            <p className={AuthStyles.GameMsg}>{message}</p>
            <ShowGames
              token={token}
              handleToken={handleToken}
              inputEnabled={inputEnabled}
              enableInput={enableInput}
              setMessage={setMessage}
              setDiv={setDiv}
              setEditGameId={setEditGameId}
            />
          </>
        )}

        {/* add these after getting showgames fixed!! */}
        {activeView === "edit" && (
          <>
            <h1 className={AuthStyles.EditTitle}>Edit Game</h1>
            <HandleEditGames
              token={token}
              inputEnabled={inputEnabled}
              enableInput={enableInput}
              setMessage={setMessage}
              setDiv={setDiv}
              editGameId={editGameId}
              clearEditGameId={() => setEditGameId}
            />
          </>
        )}

        {activeView === "delete" && (
          <>
            <h1 className={AuthStyles.EditTitle}>Delete Game</h1>
            <HandleDeleteGames
              inputEnabled={inputEnabled}
              enableInput={enableInput}
              token={token}
              setMessage={setMessage}
              setDiv={setDiv}
              editGameId={editGameId}
            />
          </>
        )}
      </div>
    </>
  );
}
