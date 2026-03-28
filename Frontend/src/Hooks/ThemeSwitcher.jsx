import ThemeOptions from "./ThemeOptions";
export default function ThemeSwitcher ({ className = "" }) {
    return (
      <div id="app">
        <div id="container">
          <div
            className={`theme-options theme-container gap-1 ${className}`}>
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