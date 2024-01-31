"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut, Home,Shield,UserCircle } from "lucide-react"; 
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { isAdmin } from "@/lib/admin";

import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  const isdetailsUpdatePage = pathname === "/detailsUpdate";
  const isAdminPage = pathname === "/admin";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">

        <Link href="/">
          <Button size="sm" variant="ghost">
            <Home className="h-4 w-4 mr-2" />
            Ana Menü
          </Button>
        </Link>

        {isAdminPage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
          </Link>
        ) : isAdmin(userId) && (
          <Link href="/admin">
            <Button size="sm" variant="ghost">
            <Shield className="h-4 w-4 mr-2" />
              Admin girişi
            </Button>
          </Link>
        )}

        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
          </Link>
        ) : isTeacher(userId) || isAdmin(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
            <UserCircle className="h-4 w-4 mr-2" />
             Antrenör Girişi
            </Button>
          </Link>
        ) : null}

        <UserButton
          afterSignOutUrl="/"
        />

        {isdetailsUpdatePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Çıkış
            </Button>
          </Link>
        ) : (
          <Link href="/detailsUpdate">
            <Button size="sm" variant="ghost">
              Profil güncelle
            </Button>
          </Link>
        )}

      </div>
    </>
  )
}
