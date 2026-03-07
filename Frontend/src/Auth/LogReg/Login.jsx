import { Card, TextInput, Label, Button } from "flowbite-react";
export default function Login () {
  // add input values as needed
  return (
    <div className="flex items-center justify-center px-2 py-8">

    <Card className="card-themed card-container border-2">
      <form className="flex w-full flex-col gap-4">

        <Label className="text-3xl font-semibold" htmlFor="username">Email:</Label>
        <TextInput
          type="text"
          placeholder="Email"
          //theme prop
          theme={{
            field: {
              input: {
                base: "form-gui border-2 h-14",
              },
            },
          }}
        />
        <Label className="text-3xl font-semibold" htmlFor="username">Password:</Label>
        <TextInput
          type="text"
          placeholder="Password"
          //theme prop
          theme={{
            field: {
              input: {
                base: "form-gui border-2 h-14",
              },
            },
          }}
        />
        <Button className="btn-style-2 w-full py-4 text-3xl font-semibold">Submit</Button>
      </form>
    </Card>
    </div>
  );
}
