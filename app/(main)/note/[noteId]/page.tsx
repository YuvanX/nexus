import { db } from "@/db"
import { notesTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { redirect } from "next/navigation"

type Props = {
    params: {
        noteId: string
    }
}
export default async function NotePage({ params: { noteId }}: Props) {
    const { userId } = await auth();
    if(!userId) {
        redirect("/signin")
    }
    const notes = await db.select().from(notesTable).where(and(eq(notesTable.id, parseInt(noteId)), eq(notesTable.userId, userId)))

    return <div className="mx-25 my-20">
        {noteId}
    </div>
}