"use client";
import { useEffect, useState } from "react";
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  handleCommandNavigation,
} from "novel";

import { defaultExtensions } from "@/lib/extensions";
import { slashCommand, suggestionItems } from "./slash-command";
import { NodeSelector } from "../selectors/node-selectors";
import { LinkSelector } from "../selectors/link-selectors";
import { TextButtons } from "../selectors/text-buttons";
import { ColorSelector } from "../selectors/color-selectors";
import { useDebounce } from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Tools } from "../tools";

export const Editor = ({
  noteId,
  username,
  noteName,
  editorState
}: {
  noteId: number;
  username: string;
  noteName: string;
  editorState: string;
}) => {
  const [content, setContent] = useState(editorState || "");
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const debouncedValue = useDebounce(content, 800);

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/save", {
        noteId,
        content,
      });

      return response.data;
    },
  });

  useEffect(() => {
    if (debouncedValue === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, [debouncedValue]);

  const extensions = [...defaultExtensions, slashCommand];
  return (
    <>
      <EditorRoot>
        <EditorContent
          className="w-full md:max-w-4xl lg:max-w-6xl md:mx-auto mt-30 pb-5 mx-1 relative"
          extensions={extensions}
          initialContent={content}
          onUpdate={({ editor }) => {
            const html = editor.getHTML();
            setContent(html);
          }}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class:
                "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
            },
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px]  w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command!(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorBubble className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl">
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <TextButtons />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
      <Tools noteId={noteId} noteName={noteName} username={username || "Yuvan"} isSaving={saveNote.isPending}/>
    </>
  );
};
