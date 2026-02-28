"use client";
import { MapPin, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

export default function NavTop() {
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="w-full flex justify-between p-4 fixed top-0 z-49 bg-green-500">
      <div></div>
      <div className="flex justify-center items-center font-bold">
        <MapPin className="m-0 text-primary h-6 w-6" /> <h1>PresentPoint</h1>
      </div>
      <div>
        <Button onClick={toggleSidebar}>
          <Menu />
        </Button>
        {/* <SidebarTrigger className="z-51" /> */}
      </div>
    </nav>
  );
}
