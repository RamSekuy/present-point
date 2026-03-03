import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { axiosSSR } from "@/lib/axios.ssr";

const adminOnly = ["/address"];

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("aauth")?.value;
  const refreshToken = req.cookies.get("rauth")?.value;
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
          return NextResponse.redirect(new URL("/auth", req.url));
        }
        return NextResponse.next();
      }

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
        const response = NextResponse.next();
        response.cookies.set("aauth", resp.data.data.accessToken, {
          maxAge: 60 * 10,
        });
        return response;
      }
      return NextResponse.redirect(new URL("/auth", req.url));
    } catch {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  // =========================
  // 3️⃣ Tidak ada token
  // =========================
  return NextResponse.redirect(new URL("/auth", req.url));
}
export const config = {
  matcher: ["/:path+"],
};
