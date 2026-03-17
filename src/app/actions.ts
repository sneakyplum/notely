
"use server";

import { auth } from "@/lib/auth";

import prisma from "@/lib/prisma";
import { headers } from 'next/headers';

export async function sendEmail() {
  try {

    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "linkolnkrauskopf@gmail.com",
        subject: "Welcome to Our App",
        html: `<p>Hello linkolnkrauskopf@gmail.com,</p><p>Welcome to our app!</p>`,
      }),
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


export async function createStickyNote(formdata: FormData) {

  const color = formdata.get("color") as string
  const trade = formdata.get("trade") as string
  const duration = Number(formdata.get("duration")); // Convert to Number!
  const workers = Number(formdata.get("workers"));



  const session = await auth.api.getSession({
    headers: await headers()
    
  })
  
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("You must be logged in to create a note");
  }

  await prisma.stickyNote.create({
    data: {
      userId: userId, // No longer string | undefined
      color: color,
      trade: trade,
      duration: duration,
      workers: workers,
    }
  })


}