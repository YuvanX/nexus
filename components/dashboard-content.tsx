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
    <div className="mx-5 md:mx-10 mt-30 pb-5 xl:mx-20">
      <div className="flex items-center flex-col gap-y-5">
        <div className="text-5xl xl:text-9xl font-semibold">Hi&#44; Yuvan&#46;</div>
        <CreateNoteDialog />
      </div>

      {notes.length === 0 && (
        <div className="text-muted-foreground text-center mt-5">No notes avaliable</div>
      )}

      <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-20 mx-5">
        {notes.map((note) => (
          <a
            href={`/note/${note.id}`}
            key={note.id}
            className="flex flex-col gap-y-5 h-96 w-full text-white bg-neutral-900 rounded-xl shadow-[6px_6px_0px_rgba(0,0,0,0.6),12px_12px_0px_rgba(0,0,0,0.3)] transition hover:scale-[1.02] hover:shadow-[8px_8px_0px_rgba(0,0,0,0.3),16px_16px_0px_rgba(0,0,0,0.1)] dark:shadow-[6px_6px_0_rgba(255,255,255,0.2),12px_12px_0_rgba(255,255,255,0.3)] dark:hover:shadow-[8px_8px_0px_rgba(255,255,255,0.3),16px_16px_0px_rgba(255,255,255,0.1)]"
          >
            <div className="w-full h-full relative">
              <Image
                src={note.image || ""}
                fill={true}
                alt={note.name}
                className="rounded-t-xl object-cover"
                style={{ objectFit: "cover" }}
              />
            </div>

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
