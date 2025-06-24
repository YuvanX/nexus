import { Plus } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { motion } from "motion/react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

export const CreateNoteDialog = () => {
  const [noteName, setNoteName] = useState("");

  function handleSubmit() {

  }
  return (
    <Dialog>
      <DialogTrigger>
        <InteractiveHoverButton>Create a New Note</InteractiveHoverButton>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center">
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
          <DialogDescription>
            You can create a note by clicking the below button
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            onChange={(e) => setNoteName(e.target.value)}
            placeholder="Name"
          />
          <div className="mt-4">
            <Button type="reset" className="mr-2">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
