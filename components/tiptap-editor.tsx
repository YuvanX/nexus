"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useState } from "react";
import { Tools } from "./tools";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Highlight from '@tiptap/extension-highlight'
export const TipTapEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const ref = useRef(null);
  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
    ],
    content: editorContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },

    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div>
      <EditorContent editor={editor} className="px-10 py-10" />
      <Tools editor={editor} />
    </div>
  );
};
