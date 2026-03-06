"use client";
import Loading from "@/components/loading";
import { axiosCSR } from "@/lib/axios.csr";
import axiosToast from "@/lib/toast";
import { TUser } from "@/models/user.model";
import { getCookie } from "cookies-next/client";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
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
  const rauthToken = getCookie("rauth");
  const { push } = useRouter();
  if (!rauthToken) {
    push("/auth");
    return <></>;
  }

  const updateUserData = async () => {
    const getUserData = async () => await axiosCSR().get("/auth/me");
    const getAccessToken = async () =>
      await axiosCSR().post("/auth/v0", undefined, {
        headers: { Authorization: `Bearer ${rauthToken}` },
      });
    getUserData()
      .then((e) => setUser(e.data.data))
      .catch((e: Error) => {
        const p = getAccessToken();
        if (e.message.toLowerCase().startsWith("jwt malformed"))
          (axiosToast(p, () => {
            getUserData().then((e) => setUser(e.data.data));
          }),
            e.message + ": Revalidating User...");
      });
  };
  useEffect(() => {
    updateUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!user ? <Loading label="Getting User Data" /> : children}
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
