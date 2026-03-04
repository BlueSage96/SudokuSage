import './App.css';
import { Outlet } from "react-router-dom";
import ThemeOptions from "./Hooks/ThemeOptions";

function App() {
  return (
    <>
      <div id="app">
        <div id="container">
          <div className="theme-options absolute">
            <ThemeOptions theme="light" bg="#ffffff" border="#000000" />
            <ThemeOptions theme="dark" bg="#1e1e1e" border="#ffffff" />
            <ThemeOptions theme="blue" bg="#3264FA" border="#000" />
            <ThemeOptions theme="red" bg="#FA6496" border="#000" />
          </div>
            <Outlet/>
        </div>
      </div>
    </>
  );
}

export default App
