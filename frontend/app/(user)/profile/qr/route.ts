import { TUser } from "@/models/user.model";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  try {
    const cookie = await cookies();
    const token = cookie.get("rauth");
    if (!token) return NextResponse.error(); // 401
    const data = jwtDecode(token.value) as TUser;

    // Decode the QR code parameter (in case it's URL encoded)
    const decodedText = decodeURIComponent(data.id);

    // Generate QR code as PNG buffer
    const qrCodeBuffer = await QRCode.toBuffer(decodedText, {
      type: "png",
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    // Return the QR code image
    return new NextResponse(new Uint8Array(qrCodeBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return new NextResponse("Error generating QR code", { status: 500 });
  }
}
