import { ModeToggle } from "@/components/mode-toggle";
import { SignIn as SignInComponent } from "@/components/sign-in";

export default function SignIn() {
  return (
    <div className="h-screen relative">
      <div className="absolute right-0 top-10">
        <ModeToggle />
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <SignInComponent />
        <div className="text-sm mt-5 text-muted-foreground">
            Secure • Private • Professional
        </div>
      </div>
    </div>
  );
}
