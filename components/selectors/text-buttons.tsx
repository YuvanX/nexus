import { cn } from "@/lib/utils";
import { EditorBubbleItem, useEditor } from "novel";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  AlignLeft,
  AlignRight,
  AlignCenter,
} from "lucide-react";
import type { SelectorItem } from "./node-selectors";
import { Button } from "@/components/ui/button";


export const TextButtons = () => {
  const { editor } = useEditor();
  if (!editor) return null;


  const items: SelectorItem[] = [
    {
      name: "bold",
      isActive: (editor) => editor.isActive("bold"),
      command: (editor) => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: "italic",
      isActive: (editor) => editor.isActive("italic"),
      command: (editor) => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: "underline",
      isActive: (editor) => editor.isActive("underline"),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      isActive: (editor) => editor.isActive("strike"),
      command: (editor) => editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    
    {
      name: 'left-align',
      isActive: (editor) => editor.isActive({ textAlign: 'left' }),
      command: (editor) => editor.chain().focus().setTextAlign('left').run(),
      icon: AlignLeft,
    },
    {
      name: 'center-align',
      isActive: (editor) => editor.isActive({ textAlign: 'center' }),
      command: (editor) => editor.chain().focus().setTextAlign('center').run(),
      icon: AlignCenter,
    },
    {
      name: 'right-align',
      isActive: (editor) => editor.isActive({ textAlign: 'right' }),
      command: (editor) => editor.chain().focus().setTextAlign('right').run(),
      icon: AlignRight,
    },
     
  ];
  return (
    <div className="flex">
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor);
          }}
        >
          <Button size="icon" className="rounded-none" variant="ghost">
            <item.icon
              className={cn("h-4 w-4", {
                "text-blue-500": item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  );
};
