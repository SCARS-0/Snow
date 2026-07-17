"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarCheck2,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    href: "/employees",
    icon: Users,
  },
  {
    title: "Monthly Roster",
    href: "/roster",
    icon: CalendarDays,
  },
  {
    title: "Queue Assignment",
    href: "/queues",
    icon: ClipboardList,
  },
  {
    title: "Leave",
    href: "/leave",
    icon: CalendarCheck2,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-3xl font-bold">RosterPro</h1>

        <p className="text-slate-400 mt-2">
          Team Rostering System
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

              ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }
              `}
            >
              <Icon size={20} />

              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}