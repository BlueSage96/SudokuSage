import { Card, Button, TextInput } from "flowbite-react";

export default function GameCreation() {
    return (
      <>
        {/* 
            Change mistakes and hints to:
            mistakes: Number(mistakes) || 0,
            usedHints: Number(hints) || 0,
            can't do this until backend is setup!
       */}
       
        <div className="flex items-center justify-center px-2 py-8">
          <Card className="card-themed card-container">
            <h1 className="title-style">New Game</h1>
            <TextInput
                type="text"
                placeholder="Easy, Medium, Hard, Extreme"
                //theme prop
                theme={{
                field: {
                    input: {
                    base: "form-gui border-2 h-14",
                    },
                },
                }}
            />

            <TextInput
                type="text"
                placeholder="Mistakes: 0"
                //theme prop
                theme={{
                field: {
                    input: {
                    base: "form-gui border-2 h-14",
                    },
                },
                }}
            />

            <TextInput
                type="text"
                placeholder="Hints: 0"
                //theme prop
                theme={{
                field: {
                    input: {
                    base: "form-gui border-2 h-14",
                    },
                },
                }}
            />

            <label htmlFor="status" className="title-style">Status:</label>
            {/* need: onChange={handleStatus} */}
            <select className="form-gui border-2 h-12">
                <option value="Not started">Not started</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
                <option value="Restarted">Restarted</option>
            </select>

            <Button className="btn-style-2 py-4 text-2xl font-semibold">
                +New
            </Button>
        </Card>
        </div>
      </>
    );
}
