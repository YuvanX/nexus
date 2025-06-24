import {
  ArrowLeft,
  BoldIcon,
  CodeXml,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ItalicIcon,
  List,
  Minus,
  Quote,
  Type,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Editor } from "@tiptap/react";


export const Tools = ({ editor }: { editor: Editor }) => {
  return (
    <div className="fixed left-20 right-20 bottom-10 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-3 py-3">
      <div className="flex items-center gap-x-3 z-50">
        <Button className="cursor-pointer">
          <ArrowLeft />
          Back
        </Button>
        <div className="h-11 ">
          <Separator className="bg-neutral-500" orientation="vertical" />
        </div>
        <div className="flex items-center gap-x-10">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <BoldIcon />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <ItalicIcon />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "is-active" : ""}
          >
            <UnderlineIcon />
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            <Heading1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            <Heading2 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            <Heading3 />
          </button>


          <button
           onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}>
            <CodeXml />
          </button>

          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Minus />
          </button>

          <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}>
            <List />
          </button>

          <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}>
            <Quote />
          </button>

          <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : ''}>
            <Highlighter />
          </button>
        </div>
      </div>
    </div>
  );
};
