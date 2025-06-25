import {
  ArrowLeft,
  BoldIcon,
  ChevronUp,
  CodeXml,
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
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

export const Tools = ({ editor }: { editor: Editor }) => {
  return (
    <div className="fixed left-20 right-20 bottom-10 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-3 py-3">
      <div className="flex items-center gap-x-3 z-50">
        <Button className="cursor-pointer">
          <ArrowLeft />
          Back
        </Button>
       
      </div>
    </div>
  );
};
