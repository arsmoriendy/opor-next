"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import { forwardRef, HTMLAttributes } from "react"

export const ThemeSwitcher = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            ref={ref}
            variant="outline"
            size="icon"
            className={className}
            {...props}
          >
            <SunIcon
              className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all
                dark:scale-0 dark:-rotate-90"
            />
            <MoonIcon
              className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90
                transition-all dark:scale-100 dark:rotate-0"
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
