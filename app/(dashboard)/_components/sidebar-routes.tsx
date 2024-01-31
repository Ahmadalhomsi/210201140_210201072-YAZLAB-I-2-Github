"use client";

import { BarChart, Compass, Home ,BadgePlus ,MessageCircle , List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Home ,
    label: "Kurslarım",
    href: "/",
  },
  {
    icon: Compass,
    label: "Keşfet",
    href: "/search",
  },
  {
    icon: MessageCircle ,
    label: "Mesajlar",
    href: "/chat",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Kurslar",
    href: "/teacher/courses",
  },
  {
    icon: BadgePlus  ,
    label: "Kurs Ekle",
    href: "/teacher/create",
  },
  {
    icon: MessageCircle ,
    label: "Mesajlar",
    href: "/chat",
  },
  
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}