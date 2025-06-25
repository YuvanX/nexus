import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";

export const Tools = ({
  username,
  noteName,
  isSaving
}: {
  username: string;
  noteName: string;
  isSaving: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-10 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl px-3 py-3 min-w-xl">
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
          <Button className="cursor-pointer" disabled variant='outline'>{isSaving ? "Saving" : "Save"}</Button>
          <Button className="cursor-pointer" variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
