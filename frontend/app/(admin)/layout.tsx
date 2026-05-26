import NavTop from "@/components/navTop";
import { SidebarProvider } from "@/components/ui/sidebar";
import UserSidebar from "@/components/userSidebar";
import { UserProvider } from "@/contexts/user.context";
import { axiosSSR } from "@/lib/axios.ssr";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const { data } = await axiosSSR().get("/auth/me");
  return (
    <UserProvider initUser={data.data}>
      <SidebarProvider className="max-w-max">
        <UserSidebar />
        <NavTop />
      </SidebarProvider>
      <main className="flex flex-col w-full overflow-auto first:max-h-24">
        <section className="py-16 min-h-screen bg-[#eaeaea]">
          {children}
        </section>
      </main>
    </UserProvider>
  );
}

const cookie = async () => {
  const c = await cookies();
  const aauth = c.get("aauth");
  const rauth = c.get("rauth");
  return {
    rauth,
    aauth,
  };
};
