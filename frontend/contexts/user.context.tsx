"use client";
import Loading from "@/components/loading";
import { axiosCSR } from "@/lib/axios.csr";
import axiosToast from "@/lib/toast";
import { TUser } from "@/models/user.model";
import { AxiosError } from "axios";
import { deleteCookie } from "cookies-next/client";
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
  logout: () => void;
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
  const rauthToken = c.rauth?.value;
  const aauthToken = c.aauth?.value;
  const { push } = useRouter();

  const updateUserData = async () => {
    const getUserData = async () => await axiosCSR(aauthToken).get("/auth/me");
    const getAccessToken = async () =>
      await axiosCSR().post("/auth/v0", undefined, {
        headers: { Authorization: `Bearer ${rauthToken}` },
      });
    getUserData()
      .then((e) => setUser(e.data.data))
      .catch((e: AxiosError<{ message?: string }>) => {
        const msg = e.response?.data.message || e.message;
        const errMSG = ["jwt expired", "invalid token", "jwt malformed"];
        const jwtMalformed = errMSG.some((m) => msg.toLowerCase().includes(m));
        console.log(jwtMalformed);
        if (jwtMalformed) {
          (axiosToast(getAccessToken(), () => {
            axiosToast(getUserData(), (e) => setUser(e.data?.data));
          }),
            e.message + ": Revalidating User...");
        }
      });
  };
  useEffect(() => {
    rauthToken ? updateUserData() : push("/auth");
  }, []);

  const logout = () => {
    setUser(null);
    deleteCookie("rauth");
    deleteCookie("aauth");
    push("/auth");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
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
