import LogReg from "./LogReg/LogReg";
import ThemeSwitcher from "../Hooks/ThemeSwitcher";
import BackButton from "../Hooks/BackButton";

export default function Auth () {
    return (
      <>
        <BackButton className="flex absolute left-[250px] top-[40px]"/>
        <ThemeSwitcher className="top-[40px] left-[400px]"/>
        <LogReg/>
      </>
    );
}