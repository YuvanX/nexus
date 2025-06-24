import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogContent, DialogTitle } from "./ui/dialog";
import axios from "axios"
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { useMutation } from "@tanstack/react-query";

export const CreateNoteDialog = () => {
  const [noteName, setNoteName] = useState("");

  const createNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/create', {
        name: noteName
      })
      return response.data
    }
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if(noteName === '') {
      window.alert('Please enter a name')
      return
    }

    createNote.mutate(undefined, {
      onSuccess: () => {
        console.log("created..");
      },
      onError: (error) => {
        console.log(error);
      }
    })
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
