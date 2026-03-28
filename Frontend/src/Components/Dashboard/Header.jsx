import { Button } from "flowbite-react";
export default function Header () {
    return (
      <>
        <div className="flex gap-8">
          <Button className="btn-style-1 text-xl">Log out</Button>
          <h1 className="title-style">Dashboard</h1>
          <Button className="btn-style-1 text-xl">Profile</Button>
        </div> 
      </>
    );
}