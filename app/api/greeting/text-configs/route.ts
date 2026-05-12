import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "";

export async function GET() {
  const res = await fetch(`${API_URL}/greeting/text-configs`, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
