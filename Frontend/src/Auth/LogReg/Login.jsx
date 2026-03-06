import { Card, TextInput, Label, Button } from "flowbite-react";
export default function Login () {
  return (
    <div className="flex items-center justify-center mt-2">

    <Card className="card-themed card-container border-2">
      <form className="flex max-w-md flex-col gap-2 items-center">

        <Label htmlFor="username">Email:</Label>
        <TextInput
          type="text"
          placeholder="Email"
          //theme prop
          theme={{
            field: {
              input: {
                base: "form-gui border-2",
              },
            },
          }}
        />
        <Label htmlFor="username">Password:</Label>
        <TextInput
          type="text"
          placeholder="Password"
          //theme prop
          theme={{
            field: {
              input: {
                base: "form-gui border-2",
              },
            },
          }}
        />
        <Button className="btn-style-2">Submit</Button>
      </form>
    </Card>
    </div>
  );
}
