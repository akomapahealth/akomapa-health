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
          className="h-8 w-8 border-[#C1C3C3] dark:border-[#FCFAEF]/20 bg-[#FCFAEF] dark:bg-[#2F3332] hover:bg-[#eeba2b]/10 hover:border-[#eeba2b] dark:hover:bg-[#eeba2b]/20"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all text-[#0097b2] dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all text-[#0097b2] dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-md shadow-lg bg-[#FCFAEF] dark:bg-[#2F3332] ring-1 ring-[#C1C3C3] ring-opacity-5 dark:ring-[#FCFAEF] dark:ring-opacity-10">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`px-4 py-2 text-sm font-body ${
            theme === "light" 
              ? "bg-[#0097b2]/10 dark:bg-[#0097b2]/20 text-[#0097b2] dark:text-[#FCFAEF]" 
              : "text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20 hover:text-[#eeba2b]"
          }`}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`px-4 py-2 text-sm font-body ${
            theme === "dark" 
              ? "bg-[#0097b2]/10 dark:bg-[#0097b2]/20 text-[#0097b2] dark:text-[#FCFAEF]" 
              : "text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20 hover:text-[#eeba2b]"
          }`}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`px-4 py-2 text-sm font-body ${
            theme === "system" 
              ? "bg-[#0097b2]/10 dark:bg-[#0097b2]/20 text-[#0097b2] dark:text-[#FCFAEF]" 
              : "text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20 hover:text-[#eeba2b]"
          }`}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}