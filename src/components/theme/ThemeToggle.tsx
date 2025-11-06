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
          className="h-8 w-8 border-[#C1C3C3] dark:border-[#FCFAEF]/20 bg-[#FCFAEF] dark:bg-[#2F3332] hover:bg-[#C37B1E]/10 hover:border-[#C37B1E] dark:hover:bg-[#C37B1E]/20"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all text-[#C37B1E] dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all text-[#007A73] dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-md shadow-lg bg-[#FCFAEF] dark:bg-[#2F3332] ring-1 ring-[#C1C3C3] ring-opacity-5 dark:ring-[#FCFAEF] dark:ring-opacity-10">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`px-4 py-2 text-sm font-body ${
            theme === "light" 
              ? "bg-[#007A73]/10 dark:bg-[#007A73]/20 text-[#007A73] dark:text-[#FCFAEF]" 
              : "text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#C37B1E]/10 dark:hover:bg-[#C37B1E]/20 hover:text-[#C37B1E]"
          }`}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`px-4 py-2 text-sm font-body ${
            theme === "dark" 
              ? "bg-[#007A73]/10 dark:bg-[#007A73]/20 text-[#007A73] dark:text-[#FCFAEF]" 
              : "text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#C37B1E]/10 dark:hover:bg-[#C37B1E]/20 hover:text-[#C37B1E]"
          }`}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`px-4 py-2 text-sm font-body ${
            theme === "system" 
              ? "bg-[#007A73]/10 dark:bg-[#007A73]/20 text-[#007A73] dark:text-[#FCFAEF]" 
              : "text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#C37B1E]/10 dark:hover:bg-[#C37B1E]/20 hover:text-[#C37B1E]"
          }`}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}