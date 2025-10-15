"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, Users, Bot, User, FileText } from "lucide-react"

const menuItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/citas", label: "Citas", icon: Calendar },
  { href: "/pacientes", label: "Pacientes", icon: Users },
  { href: "/asistente", label: "Asistente AI", icon: Bot },
  { href: "/resumen-citas", label: "Resumen Citas", icon: FileText },
  { href: "/perfil", label: "Perfil", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-foreground">MedicosPro</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Sistema de gestión</p>
      </div>

      <nav className="px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
