
import { ModeToggle } from "@/components/mode-toggle";
import { BackgroundPaths } from "@/components/ui/background-paths"
export default function Home() {
  return (
    <div className="relative">
      <div className="absolute right-20 top-10 z-50">
         <ModeToggle/>
      </div>
      <BackgroundPaths title="Nexus" />
    </div>
  );
}
