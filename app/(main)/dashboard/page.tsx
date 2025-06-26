
import { DashBoardContent } from "@/components/dashboard-content";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashBoardPage() {
  const user = await currentUser();

  if (!user) redirect("/");
  return <div className="relative">
    <DashBoardContent />
  </div>;
}
