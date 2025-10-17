import BoardStyles from "../../css/Board.module.css";
import Square from "./Square";
// import { gameState } from "../Game/GameState";

function Board() {
//   const { time } = gameState();
  const squares = Array(3).fill(null).map(() => Array(3).fill(null)); //3x3
  const numbers = Array(9).fill(null).map(() => Array(9).fill(null));

//   function gameTimer(seconds) {
//       seconds = Math.max(0, Math.floor(seconds));
//       const minutes = seconds / 60;
//       const hours = minutes / 60;
//       const remainingSeconds = seconds % 60;
//       const formatedHours = String(hours).padStart(2,'0');
//       const formatedMinutes = String(minutes).padStart(2,'0');
//       const formatedSeconds = String(remainingSeconds).padStart(2,'0');
//       return `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
//   }

  return (
    <>
    <div className={BoardStyles.StatsBar}>
      <p>Mode: <span></span></p>
      <p>Mistakes: <span></span></p>
      {/* <p>Time: <span>{gameTimer(time)}</span></p> */}
    </div>

    {/* draw grid */}
      <div className={BoardStyles.Main}>
        {/* 3x3 x 2 */}
        {squares.map((arr, rowIdx) => (
          <div key={rowIdx} className={BoardStyles.Rows}>
            {arr.map((_, colIdx) => (
              <Square key={colIdx} rowIdx={rowIdx} colIdx={colIdx} />
            ))}
          </div>
        ))}
      </div>
      {/* draw numbers below board */}
      <div className={BoardStyles.NumContainer}>
        {numbers.map((_,i) => (
            <span key={i} className={BoardStyles.NumRow}>{i + 1}</span>
        ))}
      </div>
    </>
  );
}
export default Board;
