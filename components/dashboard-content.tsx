"use client";

import { CreateNoteDialog } from "./create-notebook";

export const DashBoardContent = () => {
  return (
    <div className="mx-20 my-20">
      <div className="flex items-center flex-col gap-y-5">
        <div className="text-9xl font-semibold">Hi, Yuvan.</div>
        <CreateNoteDialog />
      </div>
      <div className="grid grid-cols-4"></div>
    </div>
  );
};
