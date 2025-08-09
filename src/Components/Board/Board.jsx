import BoardStyles from '../../css/Board.module.css';
import Squares from './Square';
import { gameState } from '../../Store/GameState';

function Board() {
    const { time, isPause, startGame, mistake, totalMistakes, isComplete, mode, changeQBoard, tryAgain } = gameState();
    const squares = Array.from({ length: 3 }, () => Array(3).fill(null));
    const numbers = Array(9).fill(null);

    function formatTime(seconds) {
        seconds = Math.max(0, Math.floor(seconds));
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const remainingSeconds = seconds % 60;
        const hoursFormatted = String(hours).padStart(2,'0');
        const minutesFormatted = String(minutes).padStart(2,'0');
        const secondsFormatted = String(remainingSeconds).padStart(2,'0');
        return  `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`
    }
    return (
        <>
         <div className={BoardStyles.StatsBar}>
            <p>Mode: <span>{mode.name}</span></p>
            <p>Mistakes: {' '} <span>{mistake}/{totalMistakes}</span></p>
            <p>Time: <span>{formatTime(time)}</span></p>
         </div>

          <div className={BoardStyles.Main}>
            {isPause && (
                <div className={BoardStyles.PauseOverlay}>
                    <div className={BoardStyles.PauseDialog}>Paused</div>
                </div>
            )}
            {isComplete && (
                <div className={BoardStyles.MistakesOverlay}>
                    <div className={BoardStyles.MistakesDialog}>
                        {mistake >= totalMistakes ? "All Mistakes Used!" : ""}
                        <button className={BoardStyles.TryAgain} onClick={() => tryAgain()}>Try Again</button>
                        <button className={BoardStyles.Restart} onClick={() => startGame(mode.key)}>Start New</button>
                    </div>
                </div>
            )}
            {squares.map((arr,row) => (
                <div key={row} className={BoardStyles.Rows}>
                    {arr.map((_,col) => (
                        <Squares key={col} row={row} col={col}/>
                    ))}
                </div>
            ))}
          </div>
          {/* Row of numbers below the board */}
          <div className={BoardStyles.NumContainer}>
              {numbers.map((_,i) => (
                    <span onClick={() => changeQBoard(i + 1)} key={i} className={BoardStyles.NumRow}>
                        {i + 1}
                    </span>
              ))}
          </div>
        </>
    )
}

export default Board;