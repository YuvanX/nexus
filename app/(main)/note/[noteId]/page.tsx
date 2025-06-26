import { Editor } from "@/components/editor/editor";
import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ noteId: string }>;
};

export default async function NotePage({ params }: Props) {
  const user = await currentUser();
  if (!user) {
    redirect("/signin");
  }

  const { noteId } = await params;

  const notes = await db
    .select()
    .from(notesTable)
    .where(
      and(eq(notesTable.id, parseInt(noteId)), eq(notesTable.userId, user.id))
    );

  const note = notes[0];

  return (
    <div>
      <div className="px-10 relative">
        <Editor
          noteId={parseInt(noteId)}
          noteName={note.name}
          username={user.username || "Yuvan"}
          editorState={note.editorState!}
        />
      </div>
    </div>
  );
}
