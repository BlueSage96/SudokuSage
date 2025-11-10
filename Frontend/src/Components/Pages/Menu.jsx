import { useNavigate } from 'react-router-dom';
import MenuStyles from '../../css/Menu.module.css';
import MenuButtonStyles from 'styled-components';
import BG from '../../assets/background.png';
import SignIn from '../../assets/SignIn1.png';


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
   padding: 7px;
   position: absolute;
   bottom: 105px;
   right: 640px;
`;

function Menu() {
  const navigate = useNavigate();
  function handleAuth() {
    navigate('/auth');
  }
  return (
    <>
      <img src={BG} className={MenuStyles.Title} alt="Background image" />
      <div className={MenuStyles.Options}>
        <Buttons onClick={handleAuth} className={MenuStyles.SignIn}>
          <img src={SignIn} alt="Sign in button" />
        </Buttons>
      </div>
    </>
  );
}
export default Menu;
