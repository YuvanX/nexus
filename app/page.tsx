
import { ModeToggle } from "@/components/mode-toggle";
import { BackgroundPaths } from "@/components/ui/background-paths"
export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-10 right-10 md:right-20 md:top-10 z-50">
         <ModeToggle/>
      </div>
      <BackgroundPaths title="Nexus" />
    </div>
  );
}
