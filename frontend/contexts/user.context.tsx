"use client";
import { axiosCSR } from "@/lib/axios.csr";
import { deleteCookie, useCookiesNext } from "cookies-next";
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
  const { aauth, rauth } = use(cookie);
  const aauthToken = aauth?.value;
  const rauthToken = rauth?.value;
  const { push } = useRouter();
  useEffect(() => {
    if (!cookie) return;
    if (aauthToken) {
      const data = jwtDecode(aauthToken);

      if (!data.exp) {
        deleteCookie("aauth");
        return;
      }

      const now = Date.now() / 1000;
      data.exp < now ? deleteCookie("aauth") : setUser(data as User);
    } else if (rauthToken) {
      axiosCSR()
        .post("/auth/v0", undefined, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${rauthToken}`,
          },
        })
        .then(({ data }) => {
          console.log(data.message);
        });
    } else {
      push("/auth");
    }
  }, [aauth, rauth]);
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
