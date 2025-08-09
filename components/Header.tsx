"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Menu, X } from "lucide-react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

interface HeaderProps {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  sidebarOpen: boolean
}

export default function Header({ darkMode, setDarkMode, setSidebarOpen, sidebarOpen }: HeaderProps) {
  const { data: session } = useSession()

  // user name থেকে প্রথম অক্ষর নিয়ে আসার ফাংশন
  const getInitials = (name?: string | null) => {
    if (!name) return "?"
    return name.charAt(0).toUpperCase()
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center h-16 px-6 justify-between lg:justify-end">
        {/* Mobile menu button - left side */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden mr-auto"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
                <Avatar className="h-8 w-8">
                  {session?.user?.image ? (
                    <AvatarImage src={session.user.image} alt={session.user.name ?? "User"} />
                  ) : (
                    <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{session?.user?.name ?? "User"}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">{session?.user?.email ?? "-"}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
