import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await auth();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { noteId, content } = body;

    if (!noteId || !content) {
      return NextResponse.json("Invalid Inputs", { status: 411 });
    }

    const note_id = parseInt(noteId);

    const notes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.id, note_id));
    if (notes.length != 1) {
      return NextResponse.json(
        {
          message: "No notes found",
        },
        { status: 500 }
      );
    }

    const note = notes[0];
    if (note.editorState != content) {
      await db
        .update(notesTable)
        .set({ editorState: content })
        .where(eq(notesTable.id, note_id));
    }
    return NextResponse.json({
        message: "Successfully Saved!"
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
        message: "Failed Saving"
    }, { status: 500 })
  }
}
