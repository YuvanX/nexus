import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await auth();
        if(!user) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, { status: 401 })
        }

        const body = await req.json()
        const { noteId } = body;
        if(!noteId) {
            return NextResponse.json({ message: "No noteId provided"}, { status: 500 })
        }

        await db.delete(notesTable).where(eq(notesTable.id, noteId))
        return NextResponse.json({ message: 'Deleted successfully!'})

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Unable to delete. Please try again!'})
    }
}