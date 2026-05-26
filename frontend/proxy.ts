import { NextRequest, NextResponse } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { axiosSSR } from "@/lib/axios.ssr";

const adminOnly = ["/address"];

export async function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("aauth")?.value;
  const refreshToken = req.cookies.get("rauth")?.value;
  const api = axiosSSR();
  // console.log("middleware hit:", req.url);
  if (req.url.endsWith("/auth")) {
    if (!refreshToken) return NextResponse.next();
  }
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
          const next = NextResponse.redirect(new URL("/auth", req.url));
          next.cookies.delete("aauth");
          return next;
        }
        if (req.url.endsWith("/auth"))
          return NextResponse.redirect(new URL("/dashboard", req.url));
        return NextResponse.next();
      }

      const next = NextResponse.redirect(new URL("/auth", req.url));
      next.cookies.delete("aauth");
      return next;
    } catch {
      return NextResponse.redirect(new URL("/auth", req.url)).cookies.delete(
        "aauth",
      );
    }
  }

  if (refreshToken) {
    try {
      const resp = await api.post("/auth/v0", undefined, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      if (resp.status === 200) {
        const next = !req.url.endsWith("/auth")
          ? NextResponse.next()
          : NextResponse.redirect(new URL("/dashboard", req.url));

        const { accessToken: newToken } = resp.data.data;
        next.cookies.set("rauth", newToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 24 * 60,
        });
        return next;
      }
      const next = NextResponse.redirect(new URL("/auth", req.url));
      next.cookies.delete("rauth");
      return next;
    } catch {
      req.cookies.delete("rauth");
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }
  return NextResponse.redirect(new URL("/auth", req.url));
}
export const config = {
  matcher: [
    "/auth",
    "/dashboard/:path*",
    "/address/:path*",
    "/cuty/:path*",
    "/profile/:path*",
    "/attendance/:path*",
  ],
};
