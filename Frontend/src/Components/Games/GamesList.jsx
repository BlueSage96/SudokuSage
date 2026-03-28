import { Card, Button } from "flowbite-react";
export default function GamesList () {
    return (
      <>
        <div>
          <Card className="card-container items-center justify-center text-2xl font-bold border-2">
            <div className="flex gap-12">
              <Button className="select-style"></Button>
              <h1>Games</h1>
              <Button className="btn-style-3">+New</Button>
            </div>

            <div className="flex gap-12">
              <Button className="select-style"></Button>
              <h1>Game 1</h1>
              <Button className="btn-style-3">Edit</Button>
            </div>
          </Card>
        </div>
      </>
    );
}