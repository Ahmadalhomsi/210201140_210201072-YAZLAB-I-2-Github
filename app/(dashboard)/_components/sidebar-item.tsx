"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-300 text-sm font-[800] pl-6 transition-all",
        isActive && "text-green-900  bg-green-300 hover:bg-green-300 text-lg"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={35}
          className={cn(  
            "text-slate-300 transition-all",
            isActive && "text-green-900 transform scale-130"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-4 border-green-900 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  )
}
