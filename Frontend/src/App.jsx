import './css/App.css';
import { Outlet, useLocation } from 'react-router-dom';
import AppStyles from 'styled-components';

const Apps = AppStyles.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;


function App() {
  const location = useLocation();
  // show Apps wrapper only for game pages (e.g. /game/:id)
  const isGame = location.pathname.startsWith('/game/:id');

  return (
    <>
      {isGame ? (
        <Apps>
          <Outlet />
        </Apps>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default App;
