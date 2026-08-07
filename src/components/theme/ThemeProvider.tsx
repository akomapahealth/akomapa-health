"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function resolveTheme(theme: Theme): "dark" | "light" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  }
  return theme
}

function applyThemeClass(theme: Theme) {
  const root = window.document.documentElement
  const resolved = resolveTheme(theme)

  // Avoid remove-then-add flashes. Stripping `dark`/`light` even briefly
  // retriggers global color transitions and can make contrast checks read
  // intermediate computed colors (e.g. rgb(103, 104, 100)).
  if (root.classList.contains(resolved)) {
    root.classList.remove(resolved === "dark" ? "light" : "dark")
    return
  }

  root.classList.remove("light", "dark")
  root.classList.add(resolved)
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "akomapa-theme",
  ...props
}: ThemeProviderProps) {
  // Initialize from localStorage synchronously on the client so the first
  // client render already reflects the stored preference. This avoids a
  // default("system") -> stored("dark") flip that would otherwise animate the
  // global color transitions through intermediate values on load.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme
    }
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme
  })

  useEffect(() => {
    applyThemeClass(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme)
      // Apply immediately so the class is correct before paint, then sync state.
      applyThemeClass(nextTheme)
      setTheme(nextTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
