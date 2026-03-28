import { Card, Button } from "flowbite-react";
import BackButton from "../../Hooks/BackButton";
import ThemeSwitcher from "../../Hooks/ThemeSwitcher";

export default function Dashboard () {
    return (
      <>
        <div className="flex w-full flex-col gap-2 items-center font-bold">
          <div className="flex w-full items-center justify-between gap-4">
            <BackButton className="!relative top-[65px] left-[150px]" />
            {/* Add ! relative back? */}
            <ThemeSwitcher className="!relative top-[65px] right-[100px]" />
          </div>

          <div
            className="card-container card-themed flex flex-col items-center 
            justify-center gap-20 border-2 px-2 py-8 rounded-xl"
          >
            <div className="flex gap-8">
              <Button className="btn-style-1">Log out</Button>
              <h1 className="title-style">Dashboard</h1>
              <Button className="btn-style-1">Profile</Button>
            </div>

            <div className="flex flex-row gap-6">
              <Card className="card-container items-center justify-center text-2xl border-2">
                Stats
              </Card>
              <Card className="card-container items-center justify-center text-2xl border-2">
                Score
              </Card>
            </div>

            <div>
              <Card className="card-container items-center justify-center text-2xl font-bold border-2">
                <div className="flex gap-12">
                  <Button className="select-style"></Button>
                  <h1>Games</h1>
                  <Button className="btn-style-1">+New</Button>
                </div>

                  <div className="flex gap-12">
                  <Button className="select-style"></Button>
                  <h1>Game 1</h1>
                  <Button className="btn-style-1">Edit</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
}