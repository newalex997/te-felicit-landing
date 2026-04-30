import { NextRequest, NextResponse } from "next/server";

async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });

  if (!res.ok) {
    throw new Error(`Telegram error: ${res.status}`);
  }
}

function validateContactForm(
  name: string,
  email: string,
  message: string,
): string | null {
  if (!name || !email || !message) return "All fields are required";
  if (name.length > 100) return "Name is too long";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address";
  if (message.length > 2000) return "Message is too long";
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    const validationError = validateContactForm(name, email, message);
    if (validationError) {
      return NextResponse.json(
        { error: { message: validationError } },
        { status: 400 },
      );
    }

    await sendTelegramMessage(
      `<b>New Contact Form Submission</b>\n\n` +
        `<b>Name:</b> ${name}\n` +
        `<b>Email:</b> ${email}\n` +
        `<b>Message:</b>\n${message}`,
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: { message: "Failed to send message" } },
      { status: 500 },
    );
  }
}
