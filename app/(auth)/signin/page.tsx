import { ModeToggle } from "@/components/mode-toggle";
import { SignIn as SignInComponent } from "@/components/sign-in";

export default function SignIn() {
  return (
    <div className="h-screen relative">
      <div className="absolute right-0 top-10">
        <ModeToggle />
      </div>
      <div className="flex justify-center items-center h-full">
        <SignInComponent />
      </div>
    </div>
  );
}
