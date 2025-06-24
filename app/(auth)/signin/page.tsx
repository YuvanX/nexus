import { ModeToggle } from "@/components/mode-toggle";
import { SignIn as SignInComponent } from "@/components/sign-in";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await currentUser();
  if(user) redirect('/dashboard')

  return (
    <div className="h-screen relative">
      <div className="absolute right-10 top-10">
        <ModeToggle />
      </div>
      <div className="flex justify-center items-center h-full">
        <SignInComponent />
      </div>
    </div>
  );
}
