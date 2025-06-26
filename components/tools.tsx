"use client";
import { AlertCircleIcon, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export const Tools = ({
  username,
  noteName,
  isSaving,
  noteId,
}: {
  username: string;
  noteName: string;
  isSaving: boolean;
  noteId: number;
}) => {
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/delete", {
        noteId,
      });

      return response.data;
    },
  });

  async function handleDelete() {
    if (deleteMessage !== `${username}/${noteName}`) {
      setError("Invalid delete message");
      return;
    }
    deleteNote.mutate(undefined, {
      onSuccess: () => {
        setSuccess("Successfully Deleted");
        router.push("/dashboard");
      },
      onError: (error) => {
        setError("Something went wrong");
        console.log(error);
      },
    });
  }

  useEffect(() => {
    if (error) {
      const time = setTimeout(() => {
        setError(null);
      }, 2000);
      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const time = setTimeout(() => {
        setSuccess(null);
      }, 2000);
      return () => clearTimeout(time);
    }
  }, [success]);

  return (
    <>
      <div className="fixed left-0 bottom-3 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-3 py-3 w-full md:max-w-xl md:left-1/2 md:-translate-x-1/2 md:bottom-10">
        <div className="flex justify-between items-center gap-x-3 z-50">
          <div className="flex items-center gap-2">
            <Button className="cursor-pointer" onClick={() => router.back()}>
              <ArrowLeft />
              Back
            </Button>
            <div className="h-10">
              <Separator className="bg-neutral-600" orientation="vertical" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-xl font-semibold">{username}/</div>
            <div className="font-normal text-sm"> {noteName}</div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="h-10">
              <Separator className="bg-neutral-600" orientation="vertical" />
            </div>
            <Button className="cursor-pointer" disabled variant="outline">
              {isSaving ? "Saving" : "Save"}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="destructive">
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold">
                    Delete Note
                  </DialogTitle>
                  <DialogDescription>
                    The project will be permanently deleted&#46; This is action is
                    irreversible and cannot be undone&#46;
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <div className="text-sm mb-1">
                    Enter the project name{" "}
                    <span className="font-semibold text-[#d62d2b] text-[15px]">
                      {username}/{noteName}
                    </span>{" "}
                    to continue:
                  </div>
                  <Input
                    onChange={(e) => setDeleteMessage(e.target.value)}
                    type="text"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Button type="reset">Cancel</Button>
                  <Button onClick={handleDelete} variant="destructive">
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-5 right-5 min-w-96 z-[100]"
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-5 right-5 min-w-96 z-[100]"
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
