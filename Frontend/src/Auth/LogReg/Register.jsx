import { Card, TextInput, Label, Button } from "flowbite-react";
export default function Register() {
    return (
      <div className="flex items-center justify-center px-4 py-2">
        <Card className="card-themed card-container border-2">
          <form className="flex w-full flex-col gap-6">
            {/* Username for greeting after successful login */}
            <Label className="text-2xl font-semibold" htmlFor="username">Username:</Label>
            <TextInput
              type="text"
              placeholder="Username"
              //theme prop
              theme={{
                field: {
                  input: {
                    base: "form-gui border-2 h-14",
                  },
                },
              }}
            />

            <Label className="text-2xl font-semibold" htmlFor="username">Email:</Label>
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
            <Label className="text-2xl font-semibold" htmlFor="username">Password:</Label>
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
            <Button className="btn-style-2 py-4 text-2xl font-semibold">Submit</Button>
          </form>
        </Card>
      </div>
    );
}