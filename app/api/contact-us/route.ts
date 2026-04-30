import { NextRequest, NextResponse } from "next/server";
import api from "@/app/common/axios";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    throw new Error("Method not allowed");
  }

  try {
    const formData = await req.formData();
    const locale = formData.get("locale");

    const response = await api.post(`users/contact-us?lang=${locale}`, {
      email: formData.get("email"),
      fullName: formData.get("name"),
      message: formData.get("message"),
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data },
      { status: error.response.status }
    );
  }
}
