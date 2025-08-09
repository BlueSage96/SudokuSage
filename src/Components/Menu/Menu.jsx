import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuStyles from '../../css/Menu.module.css';
import MenuButtonStyles from 'styled-components';
import BG from '../../assets/background.png';
import Start from '../../assets/start.png';
import Resume from '../../assets/resume.png';
import { gameState } from '../../Store/GameState';

const Buttons = MenuButtonStyles.button`
  background: none;
  border: none;
`;

const Selection = MenuButtonStyles.select`
   background-color: rgb(116,53,12);
   color: rgb(254,200,20);
   font-family: 'Noto Sans', sans-serif;
   font-size: 25px;
   font-weight: bold;
   border: 4px solid rgb(81,35,8);
   border-radius: 8px;
   text-shadow: 1px 1px black;
   padding: 8px;
   position: absolute;
   bottom: 40px;
   right: 650px;
`;

function Menu() {
  const { startGame, resumeGame } = gameState();
  const modeRef = useRef();
  const navigate = useNavigate();

  function handleStart() {
    startGame(modeRef.current.value);
    localStorage.setItem('mode', modeRef.current.value);
    navigate('/game');
  }

  function handleResume() {
    resumeGame();
    navigate('/game');
  }

  return (
    <>
      <img src={BG} className={MenuStyles.Title} alt="Background image" />
      <div className={MenuStyles.Options}>
        <Buttons onClick={handleStart}>
          <img src={Start} className={MenuStyles.Start} alt="Start button" />
        </Buttons>

        <Buttons onClick={handleResume}>
          <img src={Resume} className={MenuStyles.Resume} />
        </Buttons>

        <Selection ref={modeRef} defaultValue="easy">
          <option value="veryEasy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="extreme">Extreme</option>
        </Selection>
      </div>
    </>
  );
}
export default Menu;
