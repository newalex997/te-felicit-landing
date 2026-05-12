import { NextRequest, NextResponse } from "next/server";

const PASSKEY = "secret231";
const COOKIE_NAME = "admin_session";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { passkey } = body;

  if (passkey !== PASSKEY) {
    return NextResponse.json({ error: "Invalid passkey" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, "authenticated", {
    httpOnly: true,
    sameSite: "strict",
    path: "/dashboard",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
