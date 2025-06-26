
import { ModeToggle } from "@/components/mode-toggle";
import { BackgroundPaths } from "@/components/ui/background-paths"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await currentUser();
  if(user) {
    redirect('/dashboard')
  }

  return (
    <div className="relative">
      <div className="absolute top-10 right-10 md:right-20 md:top-10 z-50">
         <ModeToggle/>
      </div>
      <BackgroundPaths title="Nexus" />
    </div>
  );
}
