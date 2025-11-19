import { useState, useEffect } from 'react';
import { useState, useEffect } from "react";
import TimerStyle from 'styled-components';

const Timer = TimerStyle.span`
        color: white;
        position: absolute;
        top: 24px;
        left: 605px;
        font-size: 18px;
        // top: 8px;
        left: 645px;
        font-size: 20px;
`;

export default function GameTimer({ gameTimer, setGameTimer }) {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!gameTimer) return;
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - gameTimer) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [gameTimer]);

  // timeElapsed is in seconds
  const hours = Math.floor(timeElapsed / 3600);
  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = timeElapsed % 60;
  //shows missing 0 - i.e. 0.09 or 1:01
  const paddedSeconds = String(seconds).padStart(2, '0');
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedHours = String(hours).padStart(2, '0');
  console.log(setGameTimer);
  
  return (
    <>
      {gameTimer && (
        <Timer>
          {paddedHours}:{paddedMinutes}:{paddedSeconds}
        </Timer>
      )}
    </>
  );
}
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  //shows missing 0 - i.e. 0.09 or 1:01
  const paddedSeconds = String(seconds).padStart(2, '0');

  console.log('Time', setGameTimer);

  return (
    <>
      {gameTimer && (
        <Timer>{minutes}:{paddedSeconds}</Timer>
      )}
    </>
  );
}


