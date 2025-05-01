"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme/ThemeProvider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9 border-onyx-200 dark:border-floralwhite/20 bg-floralwhite dark:bg-onyx-600 hover:bg-amber/10 hover:border-amber"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-amber dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-lapis dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-floralwhite dark:bg-onyx-500 border-onyx-200 dark:border-floralwhite/20">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`${theme === "light" ? "bg-skobeloff/10 text-skobeloff" : "text-onyx-600 dark:text-floralwhite"} hover:bg-amber/10 hover:text-amber dark:hover:bg-amber/20`}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`${theme === "dark" ? "bg-skobeloff/10 text-skobeloff dark:bg-skobeloff/20 dark:text-floralwhite" : "text-onyx-600 dark:text-floralwhite"} hover:bg-amber/10 hover:text-amber dark:hover:bg-amber/20`}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`${theme === "system" ? "bg-skobeloff/10 text-skobeloff dark:bg-skobeloff/20 dark:text-floralwhite" : "text-onyx-600 dark:text-floralwhite"} hover:bg-amber/10 hover:text-amber dark:hover:bg-amber/20`}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}