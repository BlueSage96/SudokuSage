import { useState } from "react";
import { Button, Card, TextInput, Label } from "flowbite-react";
/* 
    Todo: usestate - 
    1. change on click 
    2. ternary in class name with makeForm -> setMakeForm
    3. ternary for both forms --> refer to matching master if necessary
*/
export default function LogReg () {
    const [makeForm, setMakeForm] = useState("signup");

    return (
      <>
        {/* onClick={setMakeFrom} -> would cause infinite loop */}
        <div className="flex items-center justify-center">
            {/* makeFrom ternary for colors */}
          <Button color="black" className="btn-style-1 m-2" type="button" onClick={() => setMakeForm("signup")}>
            Register
          </Button>
          <Button color="black" className="btn-style-1 m-2" onClick={() => setMakeForm("login")}>Login</Button>
        </div>

        {makeForm ? (
          <div className="justify-center items-center min-h-screen">
            <Card className="placeholder:text-white flex max-w-md border-2 rounded-lg p-2 w-full">
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
                  <Label className="">Email:</Label>
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
                <div className="flex">
                  <TextInput
                    type="text"
                    placeholder="Confirm password"
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
        ) : (
          <form>
            <h1>Login</h1>
          </form>
        )}
      </>
    );

}