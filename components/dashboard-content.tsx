import { currentUser } from "@clerk/nextjs/server";
import { CreateNoteDialog } from "./create-notebook";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { notesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export const DashBoardContent = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/signin");
  }
  const notes = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.userId, user.id));

  return (
    <div className="mx-20 my-20">
      <div className="flex items-center flex-col gap-y-5">
        <div className="text-9xl font-semibold">Hi, Yuvan.</div>
        <CreateNoteDialog />
      </div>
      {notes.length === 0 && (
        <div className="text-muted-foreground mx-auto">No notes avaliable</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-20">
        {notes.map((note) => (
          <a href={`/note/${note.id}`}
            key={note.id}
            className="flex flex-col gap-y-5 min-w-max max-w-xs text-white bg-neutral-900 rounded-xl"
          >
            <Image
              src={note.image || ""}
              width={320}
              height={320}
              alt={note.name}
              className="object-cover. rounded-t-xl"
            />

            <div className="py-2 px-4 flex items-center justify-between">
              <div>
                <div className="capitalize font-semibold text-xl">
                  {note.name}
                </div>
                <div className="text-sm">{note.createdAt.toLocaleString()}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
