import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const res = await fetch(`${API_URL}/greeting/bg-image`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
