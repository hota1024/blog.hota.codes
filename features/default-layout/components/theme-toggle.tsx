"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();

  function toggleTheme() {
    theme.setTheme(theme.resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      className={className}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
    >
      <SunIcon className="h-6 w-[1.3rem] dark:hidden" />
      <MoonIcon className="hidden size-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
