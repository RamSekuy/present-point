import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { axiosSSR } from "@/lib/axios.ssr";
import { getCookie } from "cookies-next";

const adminOnly = ["/address"];

export async function proxy(req: NextRequest) {
  const accessToken = await getCookie("aauth");
  const refreshToken = await getCookie("rauth");
  const api = axiosSSR();
  // =========================
  // 1️⃣ Jika ada access token
  // =========================
  if (accessToken) {
    try {
      const decoded: JwtPayload & { isAdmin?: boolean } =
        jwtDecode(accessToken);

      // Cek exp local
      if (!decoded.exp || decoded.exp < Date.now() / 1000) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }

      // Validasi ke backend
      const resp = await api.post("/auth/v0", undefined, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (resp.status === 200) {
        if (
          !decoded.isAdmin &&
          adminOnly.some((url) => req.url.startsWith(url))
        ) {
          req.cookies.delete("aauth");
          return NextResponse.redirect(new URL("/auth", req.url));
        }
        return NextResponse.next();
      }

      req.cookies.delete("aauth");
      return NextResponse.redirect(new URL("/auth", req.url));
    } catch {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  // =========================
  // 2️⃣ Jika hanya ada refresh token
  // =========================
  if (refreshToken) {
    try {
      const resp = await api.post("/auth/v0", undefined, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      if (resp.status === 200) {
        return NextResponse.next();
      }
      req.cookies.delete("rauth");
      return NextResponse.redirect(new URL("/auth", req.url));
    } catch {
      req.cookies.delete("rauth");
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  // =========================
  // 3️⃣ Tidak ada token
  // =========================
  if (req.url.endsWith("/auth")) return NextResponse.next();
  return NextResponse.redirect(new URL("/auth", req.url));
}
export const config = {
  matcher: ["/auth", "/address/:path*", "/cuty/:path*", "/profile/:path*"],
};
