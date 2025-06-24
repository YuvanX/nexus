"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useState } from "react";

export const TipTapEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const ref = useRef(null);
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit],
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

  return <EditorContent editor={editor} className="  px-10 py-10" />;
};
