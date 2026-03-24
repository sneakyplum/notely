
"use server";

import { auth } from "@/lib/auth";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies, headers } from 'next/headers';
import { redirect } from "next/navigation";

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

  if(!userId) {
    throw new Error("couldnt find user")
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

  revalidatePath("/dashboard");
}

export async function SignIn(formData: FormData) {
  const emailInput = formData.get("email") as string;
  const passwordInput = formData.get("password") as string;
  const res = await auth.api.signInEmail({
    body: {
      email: emailInput,
      password: passwordInput,
    },
    headers: await headers(),
    asResponse: true, // This is the "Magic Switch"
  });

  if (!res.ok) {
    console.log("Sign in failed");
    return;
  }

  // 2. Grab the cookie from the Better Auth response 
  // and manually give it to the Next.js cookie store
  const cookieStore = await cookies();
  const setCookie = res.headers.get("set-cookie");
  
  if (setCookie) {
    // This is what makes it show up in your "Application" tab!
    cookieStore.set("better-auth.session_token", setCookie); 
  }

  console.log("Sign in success!");
  redirect("/dashboard");

}