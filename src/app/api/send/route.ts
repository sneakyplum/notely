import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "linkolnkrauskopf@gmail.com", // <--- Put your actual email here
        subject: "Manual Fetch Test",
        html: "<strong>It works without the shitty SDK!</strong>",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API Error:", data);
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Fetch Crash:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}