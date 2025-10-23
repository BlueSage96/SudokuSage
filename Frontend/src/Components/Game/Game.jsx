import Board from '../Board/Board';
import { useState, useEffect } from 'react';
// import GameStyles from "../../css/Game.module.css";

export default function Game() {
  const [gameTimer, setGameTimer] = useState(null);
  // reset when leaving page
  useEffect(() => {
    setGameTimer(Date.now());
    //cleanup function
    return () => setGameTimer(null);
  }, [setGameTimer]);

  return (
    <>
      {/* Add nav & controls here */}
      <Board gameTimer={gameTimer} setGameTimer={setGameTimer} />
    </>
  );
}
