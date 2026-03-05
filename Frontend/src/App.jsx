import './App.css';
import { Outlet } from "react-router-dom";
import ThemeSwitcher from "./Hooks/ThemeSwitcher";

function App() {
  return (
    <ThemeSwitcher>
      <Outlet/>
    </ThemeSwitcher>
     
  );
}

export default App
