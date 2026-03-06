import React from "react";

const ThemeOption = ({ bg, border, theme }) => {
  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div
      className="theme-option mb-1"
      style={{ backgroundColor: bg, borderColor: border }}
      onClick={() => changeTheme(theme)}
      title={theme}
    />
  );
};

export default ThemeOption;
