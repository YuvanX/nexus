import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashBoardPage() {
    const user = await currentUser()

    if(!user) redirect('/signin')
    return <div>hi from dashboard <div>{user.createdAt}</div></div>
}