import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom"
export default function Header () {
    const navigate = useNavigate();

    const handleLogout = () => {
       navigate("/");
    }
    return (
      <>
        <div className="flex gap-8">
          <Button className="btn-style-3 text-xl" onClick={handleLogout}>Log out</Button>
          <h1 className="title-style">Dashboard</h1>
          <Button className="btn-style-3 text-xl">Profile</Button>
        </div> 
      </>
    );
}