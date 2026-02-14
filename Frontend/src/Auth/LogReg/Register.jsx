import { Card, TextInput, Label } from "flowbite-react";
export default function Register() {
    return (
      <Card className="placeholder:text-white flex max-w-md border-2 border-black rounded-lg p-2 w-full">
        <form className="flex max-w-md flex-col gap-2 items-center">
            {/* Username for greeting after successful login */}
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

          <Label htmlFor="username">Email:</Label>
          <TextInput
            type="text"
            placeholder="Email"
            //theme prop
            theme={{
              field: {
                input: {
                  base: "form-gui",
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
                  base: "form-gui",
                },
              },
            }}
          />
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
        </form>
      </Card>
    );
}