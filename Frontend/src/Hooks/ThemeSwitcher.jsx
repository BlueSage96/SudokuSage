

import ThemeOptions from "./ThemeOptions";
export default function ThemeSwitcher () {
    return (
      <div id="app">
        <div id="container">
          <div
            className="theme-options absolute 
          border-black border-2 rounded-lg p-2"
          >
            <ThemeOptions theme="light" bg="#ffffff" border="#000000" />
            <ThemeOptions theme="dark" bg="#1e1e1e" border="#ffffff" />
            <ThemeOptions theme="blue" bg="#0244FA" border="#000" />
            <ThemeOptions theme="red" bg="#FA0516" border="#000" />
            <ThemeOptions theme="green" bg="#097506" border="#000" />
            <ThemeOptions theme="purple" bg="#AB1086" border="#000" />
            <ThemeOptions theme="orange" bg="#FD7506" border="#000" />
          </div>
        </div>
      </div>
    );
}