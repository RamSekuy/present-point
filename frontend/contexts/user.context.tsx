"use client";
import { axiosCSR } from "@/lib/axios.csr";
import { deleteCookie, getCookie, useCookiesNext } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  use,
} from "react";

type User = TUser;

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type TCookie = Promise<{
  aauth?: RequestCookie;
  rauth?: RequestCookie;
}>;

type UserProviderProps = { children: ReactNode; cookie: TCookie };

export function UserProvider({ children, cookie }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const c = use(cookie);
  const updateUserData = () => {
    axiosCSR()
      .get("/auth/me")
      .then((e) => {
        setUser(e.data.data);
      });
  };
  useEffect(() => {
    updateUserData();
  }, [c.aauth]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
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
