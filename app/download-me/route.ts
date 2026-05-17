import { NextRequest, NextResponse } from "next/server";

const IOS_URL = "https://apps.apple.com/us/app/mesaje-din-suflet/id6761735730";
const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=com.pipedigital.mesajedinsuflet";
const FALLBACK_URL = "https://mesajedinsuflet.app";

export async function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";

  let destination: string;
  if (/iphone|ipad|ipod/i.test(ua)) {
    destination = IOS_URL;
  } else if (/android/i.test(ua)) {
    destination = ANDROID_URL;
  } else {
    destination = FALLBACK_URL;
  }

  return NextResponse.redirect(destination, { status: 302 });
}
