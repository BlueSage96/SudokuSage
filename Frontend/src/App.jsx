import './css/App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Auth from "./Auth/Auth";
import AppStyles from "styled-components";

const Apps = AppStyles.div`
    height: 900px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;

function App() {

  return (
    <>
      <Apps>
        <Outlet></Outlet>
      </Apps>
    </>
  )
}

export default App
