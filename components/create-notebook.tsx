'use client'
import axios from "axios";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export const CreateNoteDialog = () => {
  const [noteName, setNoteName] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const createNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/create", {
        name: noteName,
      });
      console.log(response.data);

      return response.data;
    },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (noteName === "") {
      setError("Please enter a valid notebook name");
      return;
    }

    createNote.mutate(undefined, {
      onSuccess: ({ noteId }) => {
        setSuccess("Created new note");
        router.push(`/note/${noteId}`);
      },
      onError: (error) => {
        console.log(error);
        setError("Something went wrong. Please try again!");
      },
    });
  }
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <InteractiveHoverButton>Create a New Note</InteractiveHoverButton>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col justify-center mx-2">
          <DrawerHeader>
            <DrawerTitle className="text-3xl">New Note</DrawerTitle>
            <DrawerDescription>
              You can create a note by clicking the below button
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="w-full md:max-w-[400px] mx-auto py-10">
            <Input
              onChange={(e) => setNoteName(e.target.value)}
              placeholder="Name"
            />
            <div className="mt-4 flex flex-col gap-y-3">
              <Button type="reset" className="">
                Cancel
              </Button>
              <Button disabled={createNote.isPending} type="submit">
                {createNote.isPending && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                Create
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-50 right-5 z-[100] min-w-96"
          >
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-50 right-5 z-[100 min-w-96"
          >
            <Alert variant="default">
              <AlertCircleIcon />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
