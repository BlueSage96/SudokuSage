import { Card, TextInput, Label, Button, Checkbox } from "flowbite-react";
import { Check } from "lucide-react";
export default function Login () {
  // add input values, handlers, and onChange as needed
  return (
    <div className="flex items-center justify-center px-2 py-8">
      <Card className="card-themed card-container border-2">
        <form className="flex w-full flex-col gap-4">
          <Label className="text-3xl font-semibold" htmlFor="username">
            Email:
          </Label>
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
          <Label className="text-3xl font-semibold" htmlFor="username">
            Password:
          </Label>
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
          <div className="flex justify-between">
            {/* <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                className="peer appearance-none select-style"
              />
       
              <Check className="check-style" />
              
            </div> */}
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <Checkbox className="peer appearance-none select-style" />

                {/* Custom checkmark */}
                <Check className="check-style" />
                <Label htmlFor="remember" className="!relative left-[10px] bottom-[5px]">Remember me</Label>
              </div>
            </label>
             <a className="forgot-pwd">Forgot Password?</a>
          </div>
         
          <Button className="btn-style-2 w-full py-4 text-3xl font-semibold">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
