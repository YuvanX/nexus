import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ModeToggle } from "./mode-toggle";
import { Avatar } from "./ui/avatar";

export const AppBar = () => {
  return (
    <div className="flex justify-between items-center  mx-20 my-2 px-5 py-5 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl">
      <div className="text-2xl uppercase font-semibold tracking-tighter">
        Nexus
      </div>
      <div className="flex items-center gap-x-8">
        <ModeToggle />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
