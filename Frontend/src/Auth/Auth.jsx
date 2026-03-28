import LogReg from "./LogReg/LogReg";
import ThemeSwitcher from "../Hooks/ThemeSwitcher";
import BackButton from "../Hooks/BackButton";

export default function Auth () {
    return (
      <>
        <BackButton className="flex absolute left-[450px] top-[40px]"/>
        <ThemeSwitcher className="top-[40px] right-[400px]"/>
        <LogReg/>
      </>
    );
}