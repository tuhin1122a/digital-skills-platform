"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Award, LogOut, Home, FileText, User, Award as AwardIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: FileText, label: "My Tests", href: "/dashboard/tests" },
  { icon: AwardIcon, label: "Certificates", href: "/dashboard/certificates" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
]

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <AwardIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">DigitalCert</span>
        </div>
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
          <LogOut className="h-5 w-5" />
          {/* চাইলে X আইকন বসাতে পারো */}
        </Button>
      </div>

      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
