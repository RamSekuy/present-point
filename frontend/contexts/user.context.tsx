"use client";
import { logoutAction } from "@/actions/auth.action";
import Loading from "@/components/loading";
import actionToast from "@/lib/toast";
import { TUser } from "@/models/user.model";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode } from "react";

type User = TUser;

type UserContextType = {
  user: User | null;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = { children: ReactNode; initUser?: User };

export function UserProvider({ children, initUser }: UserProviderProps) {
  const { push } = useRouter();
  const logout = () => {
    actionToast(
      logoutAction(),
      () => {
        push("/auth");
      },
      "Logging out...",
    );
  };
  if (!initUser) throw new Error("initUser is required for UserProvider");
  const [user] = useState<User>(initUser);

  return (
    <UserContext.Provider value={{ user, logout }}>
      {!user ? (
        <div className="w-full h-dvh flex justify-center items-center">
          <Loading label="Getting User Data" />
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}

export function Username() {
  const { user } = useUser();
  return <>{user?.name || "Username"}</>;
}
