"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Scan,
  LogOut,
  User,
  Home,
  CalendarMinus,
  History,
  IdCard,
  LocateFixed,
} from "lucide-react";
import { useUser } from "@/contexts/user.context";
import { deleteCookie } from "cookies-next/client";
import Image from "next/image";
import { imgURL } from "../lib/imgURL";

const menus = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Scan", href: "/attendance/scan", icon: Scan },
  { label: "Cuti", href: "/cuty", icon: CalendarMinus },
  { label: "History", href: "/attendance", icon: History },
  { label: "ID Card", href: "/profile/id-card", icon: IdCard },
];
const adminMenus = [{ label: "Address", href: "/address", icon: LocateFixed }];

export default function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setUser } = useUser();
  function isActive(href: string) {
    return pathname.endsWith(href);
  }

  async function handleLogout() {
    deleteCookie("rauth");
    deleteCookie("aauth");
    setUser(null);
    router.push("/auth");
  }

  return (
    <Sidebar className="z-50">
      {/* HEADER */}
      <SidebarHeader className="px-4 py-3 text-lg font-semibold">
        Main Menu
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup className="space-y-1 px-2">
          <SidebarGroupLabel>User Menu</SidebarGroupLabel>
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = isActive(menu.href);

            return (
              <Link key={menu.href} href={menu.href}>
                <div
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                  ${
                    active
                      ? "bg-primary text-primary-foreground translate-x-2"
                      : "hover:bg-muted hover:translate-x-2"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{menu.label}</span>
                </div>
              </Link>
            );
          })}
        </SidebarGroup>
        {user?.isAdmin && (
          <SidebarGroup className="space-y-1 px-2">
            <SidebarGroupLabel>Admin Menu</SidebarGroupLabel>
            {adminMenus.map((menu) => {
              const Icon = menu.icon;
              const active = isActive(menu.href);

              return (
                <Link key={menu.href} href={menu.href}>
                  <div
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                  ${
                    active
                      ? "bg-primary text-primary-foreground translate-x-2"
                      : "hover:bg-muted hover:translate-x-2"
                  }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{menu.label}</span>
                  </div>
                </Link>
              );
            })}
          </SidebarGroup>
        )}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="space-y-2 p-3">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted hover:scale-103 transition"
        >
          {user?.imageId ? (
            <div className="rouded-full h-4 w-4 relative">
              <Image
                src={imgURL(user?.imageId)}
                fill
                objectFit="contain"
                alt="avatar"
                unoptimized
              />
            </div>
          ) : (
            <User className="h-4 w-4" />
          )}
          {user?.name || "Profile"}
        </Link>

        <Button
          variant="destructive"
          className="w-full justify-start gap-2 hover:cursor-pointer hover:scale-103 transition"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
