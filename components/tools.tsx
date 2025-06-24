import {
  ArrowLeft,
  BoldIcon,
  CodeXml,
  Heading,
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

export const Tools = () => {
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
          <button>
            <BoldIcon />
          </button>

          <button>
            <ItalicIcon />
          </button>

          <button>
            <UnderlineIcon />
          </button>

          <button>
            <Type />
          </button>
          <button>
            <Heading />
          </button>
          <button>
            <CodeXml />
          </button>

          <button>
            <Minus />
          </button>

          <button>
            <List />
          </button>

          <button>
            <Quote />
          </button>

          <button>
            <Highlighter />
          </button>
        </div>
      </div>
    </div>
  );
};
