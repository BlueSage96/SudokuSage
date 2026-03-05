import './App.css';
import { Outlet } from "react-router-dom";
import ThemeOptions from "./Hooks/ThemeOptions";

function App() {
  return (
    <>
      <div id="app">
        <div id="container">
          <div
            className="theme-options absolute 
          border-black border-2 rounded-lg p-2">
            <ThemeOptions theme="light" bg="#ffffff" border="#000000" />
            <ThemeOptions theme="dark" bg="#000000" border="#ffffff" />
            <ThemeOptions theme="blue" bg="#0244FA" border="#000" />
            <ThemeOptions theme="green" bg="#097506" border="#000" />
            <ThemeOptions theme="purple" bg="#AB1086" border="#000" />
            <ThemeOptions theme="orange" bg="#FD7506" border="#000" />
          </div>
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default App
