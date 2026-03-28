import { Card, Button } from "flowbite-react";
import BackButton from "../../Hooks/BackButton";
import ThemeSwitcher from "../../Hooks/ThemeSwitcher";
import Header from "./Header";
import Stats from "./Stats";
import Scores from "./Scores";
import Games from "../Games/GamesList";

export default function Dashboard () {
    return (
      <>
        <div className="flex w-full flex-col gap-2 items-center font-bold">
          <div className="flex w-full items-center justify-between gap-4">
            <BackButton className="text-xl !relative top-[65px] left-[150px]" />
            {/* Add ! relative back? */}
            <ThemeSwitcher className="!relative top-[65px] right-[100px]" />
          </div>

          <div
            className="card-container card-themed flex flex-col items-center 
            justify-center gap-20 border-2 px-2 py-8 rounded-xl"
          >
            <Header/>

            <div className="flex flex-row gap-6">
              <Stats/>
              <Scores/>
            </div>
            <Games/>
          </div>
        </div>
      </>
    );
}