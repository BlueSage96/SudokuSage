import { Card, Button, Checkbox } from "flowbite-react";
import { Check } from "lucide-react";
export default function GamesList () {
    return (
      <>
        <div>
          <Card className="card-container items-center justify-center font-bold border-2">
            <div className="flex gap-12 mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <Checkbox className="peer appearance-none select-style" />

                  {/* Custom checkmark */}
                  <Check className="check-style" />
                </div>
              </label>
              <h1 className="text-2xl">Games</h1>
              <Button className="btn-style-3 !relative right-[20px]">
                +New
              </Button>
            </div>
            
            <hr className="border-2"/>
            {/* Make into it's own reusable modal */}
            <div className="flex gap-12 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="relative">
                  <Checkbox className="peer appearance-none select-style" />

                  {/* Custom checkmark */}
                  <Check className="check-style" />
                </div>
              </label>
              <h1 className="text-xl">Game 1</h1>
              <Button className="btn-style-3 !relative bottom-[10px] right-[5px]">
                Edit
              </Button>
              <Button className="btn-style-3 !relative bottom-[10px] right-[45px]">
                Delete
              </Button>
            </div>
          </Card>
        </div>
      </>
    );
}