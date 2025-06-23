"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;
  return (
    <div className="w-20 h-20 rounded-full">
      {resolvedTheme === "light" ? (
        <Moon className="cursor-pointer" onClick={handleToggle} />
      ) : (
        <Sun className="cursor-pointer" onClick={handleToggle} />
      )}
    </div>
  );
};
