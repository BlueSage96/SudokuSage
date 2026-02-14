import { Card, TextInput, Label } from "flowbite-react";
export default function Register() {
  return (
    <div className="justify-center items-center min-h-screen">
      <Card className="placeholder:text-white flex max-w-md border-2 border-black rounded-lg p-2 w-full">
        <form className="flex max-w-md flex-col gap-4 items-center">
          <div className="">
            <Label htmlFor="username">Username:</Label>
            <TextInput
              type="text"
              placeholder="Username"
              //theme prop
              theme={{
                field: {
                  input: {
                    base: "form-gui",
                  },
                },
              }}
            />
          </div>

          <div className="flex">
            <Label className="">Password:</Label>
            <TextInput
              type="text"
              placeholder="Password"
              //theme prop
              theme={{
                field: {
                  input: {
                    base: "form-gui",
                  },
                },
              }}
            />
          </div>
          
        </form>
      </Card>
    </div>
  );
}
