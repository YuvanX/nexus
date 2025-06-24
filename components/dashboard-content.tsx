"use client";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { CreateNoteDialog } from "./create-notebook";

export const DashBoardContent = () => {
  return (
    <div className="mx-20 my-20">
      <CreateNoteDialog />
      <div className="grid grid-cols-4"></div>
    </div>
  );
};
