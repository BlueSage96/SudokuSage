import { Card, Button, TextInput } from "flowbite-react";
import BackButton from "../../Hooks/BackButton";
import ThemeSwitcher from "../../Hooks/ThemeSwitcher";

export default function Dashboard () {
    return (
      <>
        <BackButton className="flex absolute top-[65px]" />
        <ThemeSwitcher className="top-[65px] left-[400px]"/>

        <div className="flex items-center justify-center px-2 py-8">
          <Card className="card-themed card-container border-2">
            <h1 className="title-style">Dashboard</h1>
          </Card>
        </div>
      </>
    );
}