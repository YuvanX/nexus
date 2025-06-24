
import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/googleai";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userId } =await auth()
    if(!userId) {
        return NextResponse.json({ message: "Unauthorized"}, { status: 401 })
    }
    const body = await req.json()
    const { name } = body

    const imageDescription = await generateImagePrompt(name);
    if(!imageDescription) {
        return NextResponse.json({
            message: 'Invalid Image Description'
        }, { status: 500 })
    }

    const imageUrl = await generateImage(imageDescription, name)
    if(!imageUrl) {
        return NextResponse.json({
            message: "No imageUrl provided"
        }, { status: 500 })
    }
    const noteId = await db.insert(notesTable).values({
        userId,
        image: imageUrl,
        name,
    }).returning({
        insertedId: notesTable.id
    })

    return NextResponse.json({
        noteId,
        message: "Created successfully"
    })
}