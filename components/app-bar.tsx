import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ModeToggle } from "./mode-toggle";
import { Avatar } from "./ui/avatar";

export const AppBar = () => {
  return (
    <div className="fixed top-2 inset-x-0 z-50">
  <div className="mx-5 md:mx-10 lg:mx-20 px-4 py-4 flex justify-between items-center bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl">
    <div className="text-black dark:text-white text-2xl uppercase font-semibold tracking-tighter">
      Nexus
    </div>
    <div className="flex items-center gap-x-6">
      <ModeToggle />
      <Avatar className="cursor-pointer hover:ring-2 hover:ring-white/20 transition">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  </div>
</div>
  );
};
