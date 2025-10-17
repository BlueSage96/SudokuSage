import { useNavigate } from "react-router-dom";
// import { useEffect, useRef } from 'react';
import Board from "../Board/Board";
// import Nav from "../UI/NavBar";
// import Controls from "../UI/ControlsFunc";
import GameStyles from "../../css/Game.module.css";
// import { gameState } from "./GameState";

function Game() {
  const navigate = useNavigate();
  //  const timeRef = useRef();

  return (
    <>
      <div>
        <button className={GameStyles.backButton} onClick={() => navigate(-1)}>
          &larr; Back
        </button>
        {/* <Nav />
        <Controls /> */}
        <Board />
      </div>
    </>
  );
}
export default Game;
